import os
import sys
import asyncio
from datetime import timedelta
from flask import Flask, request, jsonify, session, Response
from flask_cors import CORS
from flask_session import Session

# Ensure the ScoutSuite module is in sys.path if necessary.
# (Adjust the path accordingly)
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "ScoutSuite"))

from ScoutSuite.__main__ import run  # run() calls _run() internally

app = Flask(__name__)
app.config["SESSION_TYPE"] = "filesystem"
app.config.update(SESSION_COOKIE_SAMESITE="Lax", SESSION_COOKIE_SECURE=False) 
Session(app)
CORS(app, supports_credentials=True)

app.api_key = ''
app.secret_key = ''
AWS_REGION = ''


@app.route('/authenticate', methods=['POST'])
def authenticate():
    data = request.get_json()
    api_key = data.get('apiKey')
    secret_key = data.get('secretKey')
    
    # For AWS, map apiKey to aws_access_key_id and secretKey to aws_secret_access_key.
    session['aws_access_key_id'] = api_key
    session['aws_secret_access_key'] = secret_key

    return jsonify({"status": "Authenticated"})


# Endpoint to generate audit report AND return it as a rendered HTML page.
@app.route('/report', methods=['GET'])
def report():
    # Retrieve AWS credentials from session.
    aws_access_key_id = session.get('aws_access_key_id')
    aws_secret_access_key = session.get('aws_secret_access_key')
    
    if not aws_access_key_id or not aws_secret_access_key:
        return jsonify({"error": "AWS credentials missing. Please authenticate."}), 401

    # Ensure an event loop is in this thread.
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

    # Call your run() function. Note: Adjust parameters as needed.
    result = run(
        provider='aws',
        profile=None,
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        aws_session_token=None,
        kubernetes_cluster_provider=None,
        kubernetes_config_file=None,
        kubernetes_context=None,
        kubernetes_persist_config=True,
        kubernetes_azure_subscription_id=None,
        report_name="audit_report",
        report_dir="reports",
        timestamp=True,
        services=[],
        skipped_services=[], 
        list_services=None,
        result_format='json',
        database_name=None,
        host_ip='127.0.0.1',
        host_port=8000,
        max_workers=10,
        regions=[],
        excluded_regions=[],
        fetch_local=False,
        update=False,
        max_rate=None,
        ip_ranges=[], 
        ip_ranges_name_key='name',
        ruleset='default.json',
        exceptions=None,
        force_write=False,
        debug=False,
        quiet=False,
        log_file=None,
        no_browser=True,  # Do not open browser – we will serve the report content.
        programmatic_execution=True
    )

    # When _run() completes, it returns a dict with the report HTML.
    # Here we assume result is a dict that contains "report" with the HTML text.
    # If result contains {"report": html_content, "errors": ...}:
    if isinstance(result, dict) and "report" in result:
        html_content = result["report"]
        # Return a Response with the HTML content
        return Response(html_content, mimetype='text/html')
    else:
        return jsonify({"error": "Report generation failed"}), 500


@app.route('/fix', methods=['POST'])
def fix_issue():
    data = request.get_json()
    issue_id = data.get('id')
    # TODO: implement issue fix logic here
    return jsonify({"status": f"Issue {issue_id} fixed (placeholder)"})


@app.route('/fix-all', methods=['POST'])
def fix_all_issues():
    # TODO: implement bulk fix logic here
    return jsonify({"status": "All issues fixed (placeholder)"})


if __name__ == '__main__':
    app.run(debug=True)
