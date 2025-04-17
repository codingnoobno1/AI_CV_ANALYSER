
# --- Routes ---

@app.route('/upload_jd', methods=['POST'])
def upload_jd():
    data = request.json
    required = ['role', 'skills', 'count']
    if not all(k in data for k in required):
        return jsonify({'error': 'Missing JD fields'}), 400

    jd_data.clear()
    jd_data.update({
        'id': str(uuid.uuid4()),
        'role': data['role'],
        'skills': data['skills'],
        'count': data['count'],
        'text': f"{data['role']} with skills: {data['skills']}"
    })
    resumes_db.clear()
    return jsonify({'message': 'JD uploaded successfully'}), 200

@app.route('/upload_resumes', methods=['POST'])
def upload_resumes():
    if not jd_data:
        return jsonify({'error': 'No JD uploaded yet. Resume upload disabled.'}), 403

    if 'resumes' not in request.files:
        return jsonify({'error': 'No files uploaded'}), 400

    files = request.files.getlist('resumes')
    if len(files) > 20:
        return jsonify({'error': 'Max 20 files allowed'}), 400

    session_id = str(uuid.uuid4())
    session_folder = os.path.join(UPLOAD_FOLDER, session_id)
    os.makedirs(session_folder, exist_ok=True)

    jd_text = jd_data['text']
    jd_embedding = model.encode(jd_text, convert_to_tensor=True)

    for file in files:
        filename = secure_filename(file.filename)
        if not (filename.endswith('.pdf') or filename.endswith('.docx')):
            continue

        path = os.path.join(session_folder, filename)
        file.save(path)
        raw_text = extract_text(path)
        emb = model.encode(raw_text, convert_to_tensor=True)
        score = util.cos_sim(jd_embedding, emb).item()

        matched_skills = extract_skills(raw_text, jd_data['skills'])
        profile_found = has_profile_link(raw_text)
        auto_validated = simulate_verification(raw_text)

        token = str(uuid.uuid4())[:8]  # Simulate token

        resume_entry = {
            'filename': filename,
            'match_score': round(score * 100, 2),
            'matched_skills': matched_skills,
            'role_applied': jd_data['role'],
            'profile_link_found': profile_found,
            'token': token,
            'verification_sent': False,
            'verification_submitted': False,
            'auto_validated': auto_validated,
            'final_status': 'Pending',
            'hr_override': False,
            'warning': None
        }

        if score < 0.5:
            resume_entry['warning'] = '⚠ Low match score'
        elif not profile_found:
            resume_entry['warning'] = '⚠ Missing profile link'

        resumes_db.append(resume_entry)

    return jsonify({'message': 'Resumes processed'}), 200

@app.route('/shortlist', methods=['GET'])
def get_shortlist():
    if not resumes_db:
        return jsonify({'message': 'No processed resumes'}), 404

    sorted_resumes = sorted(resumes_db, key=lambda x: x['match_score'], reverse=True)
    return jsonify({'shortlist': sorted_resumes}), 200

@app.route('/send_verification/<token>', methods=['POST'])
def send_verification(token):
    for resume in resumes_db:
        if resume['token'] == token:
            resume['verification_sent'] = True
            return jsonify({'message': f"Verification sent to candidate ({token})"}), 200
    return jsonify({'error': 'Invalid token'}), 404

@app.route('/submit_verification/<token>', methods=['POST'])
def submit_verification(token):
    for resume in resumes_db:
        if resume['token'] == token:
            resume['verification_submitted'] = True
            if resume['auto_validated']:
                resume['final_status'] = 'Validated'
            else:
                resume['final_status'] = 'Needs Manual Review'
            return jsonify({'message': 'Verification submitted'}), 200
    return jsonify({'error': 'Invalid token'}), 404

@app.route('/hr_override/<token>', methods=['POST'])
def hr_override(token):
    for resume in resumes_db:
        if resume['token'] == token:
            resume['hr_override'] = True
            resume['final_status'] = 'Validated (Manual Override)'
            return jsonify({'message': 'HR override applied'}), 200
    return jsonify({'error': 'Invalid token'}), 404

@app.route('/reset', methods=['POST'])
def reset():
    jd_data.clear()
    resumes_db.clear()
    shutil.rmtree(UPLOAD_FOLDER)
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    return jsonify({'message': 'System reset complete'}), 200

if _name_ == '_main_':
    app.run(debug=True)
