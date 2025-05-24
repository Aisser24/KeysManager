<?php
// Simple debug script to test your API routes
// Place this in your web root and access it via browser

header('Content-Type: text/html');
?>
<!DOCTYPE html>
<html>
<head>
    <title>API Debug</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .info { background: #f0f0f0; padding: 10px; margin: 10px 0; }
        .success { background: #d4edda; padding: 10px; margin: 10px 0; }
        .error { background: #f8d7da; padding: 10px; margin: 10px 0; }
        button { padding: 10px; margin: 5px; cursor: pointer; }
    </style>
</head>
<body>
    <h1>API Debug Information</h1>
    
    <div class="info">
        <h3>Server Information:</h3>
        <p><strong>REQUEST_URI:</strong> <?= $_SERVER['REQUEST_URI'] ?? 'not set' ?></p>
        <p><strong>PATH_INFO:</strong> <?= $_SERVER['PATH_INFO'] ?? 'not set' ?></p>
        <p><strong>SCRIPT_NAME:</strong> <?= $_SERVER['SCRIPT_NAME'] ?? 'not set' ?></p>
        <p><strong>REQUEST_METHOD:</strong> <?= $_SERVER['REQUEST_METHOD'] ?? 'not set' ?></p>
        <p><strong>HTTP_HOST:</strong> <?= $_SERVER['HTTP_HOST'] ?? 'not set' ?></p>
    </div>

    <h3>Test API Endpoints:</h3>
    <button onclick="testEndpoint('/api/test')">Test Route</button>
    <button onclick="testEndpoint('/api/tokens')">List Tokens</button>
    <button onclick="testEndpoint('/api/mitarbeiter')">List Mitarbeiter</button>
    <button onclick="testEndpoint('/api/assignments/active')">Active Assignments</button>
    
    <div id="results"></div>

    <script>
        async function testEndpoint(endpoint) {
            const resultsDiv = document.getElementById('results');
            try {
                const response = await fetch(endpoint);
                const data = await response.text();
                const statusClass = response.ok ? 'success' : 'error';
                resultsDiv.innerHTML = `
                    <div class="${statusClass}">
                        <h4>Testing: ${endpoint}</h4>
                        <p><strong>Status:</strong> ${response.status} ${response.statusText}</p>
                        <p><strong>Response:</strong></p>
                        <pre>${data}</pre>
                    </div>
                ` + resultsDiv.innerHTML;
            } catch (error) {
                resultsDiv.innerHTML = `
                    <div class="error">
                        <h4>Testing: ${endpoint}</h4>
                        <p><strong>Error:</strong> ${error.message}</p>
                    </div>
                ` + resultsDiv.innerHTML;
            }
        }
    </script>
</body>
</html>