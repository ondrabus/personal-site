import Head from 'next/head';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

const FetchApiCheatsheet: any  = () => {
  useEffect(() => {
	hljs.initHighlightingOnLoad();
  }, []);
  return (
	  <React.Fragment>
		<Head>
			<title>Fetch API cheatsheet - Ondrabus</title>
			<meta property="og:title" content="Fetch API cheatsheet - Ondrabus" />
			<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"></link>
		</Head>
		
		<main>
        	<section className="content cheatsheet"> 
    			<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}>
      				<h1>Fetch API cheatsheet</h1>
					<p>Download printable version: <a href="/pdf/cheatsheet-fetch.pdf" title="Printable Fetch API cheatsheet">Fetch API cheatsheet (PDF, 4.2MB)</a>, <a href="/pdf/cheatsheet-processing-results.pdf" title="Printable processing results of Fetch API cheatsheet">processing results cheatsheet (PDF, 3MB)</a></p>
					<table cellSpacing="10">
						<thead>
							<tr>
								<th className="code">GET</th>
								<th className="code">POST</th>
								<th className="desc"></th>
							</tr>
						</thead>
						<tbody>
						<tr>
							<td>
								<pre><code className="js">
{`fetch('{url}')
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>
								<pre><code className="js">
{`fetch('{url}', {
    method: 'post'
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>simple</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">
{`fetch('{url}', {
    headers: {
        'Authorization': 'Basic {token}'
    }
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>
								<pre><code className="js">
{`fetch('{url}', {
    method: 'post',
    headers: {
        'Authorization': 'Basic {token}'
    }
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>authorization token (Bearer)</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">
{`fetch('{url}?var1=value1&var2=value2')
	.then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>
								<pre><code className="js">
{`fetch('{url}?var1=value1&var2=value2', {
    method: 'post'
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>querystring data</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">
{`fetch('{url}', {
    mode: 'cors'
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>
								<pre><code className="js">
{`fetch('{url}', {
    mode: 'cors',
	method: 'post'
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>CORS</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">
{`fetch('{url}?var1=value1&var2=value2', {
    headers: {
        'Authorization': 'Bearer {token}'
    }
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>
								<pre><code className="js">
{`fetch('{url}?var1=value1&var2=value2', {
    method: 'post',
    headers: {
        'Authorization': 'Bearer {token}'
    }
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>authorization token + querystring data</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<pre><code className="js">
{`let formData = new FormData();
formData.append('field1', 'value1');
formData.append('field2', 'value2');

fetch('{url}', {
    method: 'post',
    body: formData
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>form data</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<pre><code className="js">
{`fetch('{url}', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'field1': 'value1',
        'field2': 'value2'
    })
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>JSON data</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<pre><code className="js">
{`fetch('{url}', {
    method: 'post',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'field1': 'value1',
        'field2': 'value2'
    })
})
    .then(response => console.log(response));
`}
								</code></pre>
							</td>
							<td>JSON data + CORS</td>
						</tr>
						</tbody>
					</table>
					<h2>Processing response</h2>
					<table cellSpacing="10">
						<thead>
						<tr>
							<th className="code">Promise</th>
							<th className="code">Async/await</th>
							<th className="desc"></th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>
								<pre><code className="js">
{`fetch(...)
	.then(response => {
		if (response.status == 200){
			// all OK
		} else {
			console.log(response.statusText);
		}
	});
`}
								</code></pre>
							</td>
							<td>
								<pre><code className="js">
{`async function getData(){
	let response = await fetch(...);
	
	if (response.status == 200){
		// all OK
	} else {
		console.log(response.statusText);
	}
}
`}
								</code></pre>
							</td>
							<td>checking status code</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">
{`var userId;

fetch(...)
    .then(response => response.text())
    .then(id => {
        userId = id;
        console.log(userId)
    });
`}
								</code></pre>
							</td>
							<td>
								<pre><code className="js">
{`async function getData(){
	let response = await fetch(...);
	let userId = await response.text();
	
	console.log(userId);
}
`}
								</code></pre>
							</td>
							<td>getting a simple value</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">
{`var dataObj;

fetch(...)
    .then(response => response.json())
    .then(data => {
        dataObj = data;
        console.log(dataObj)
    });
`}
								</code></pre>
							</td>
							<td>
								<pre><code className="js">
{`async function getData(){
	let response = await fetch(...);
	let dataObj = await response.json();
	
	console.log(dataObj);
}
`}
								</code></pre>
							</td>
							<td>getting JSON data</td>
						</tr>
						</tbody>
					</table>
    			</motion.div>
			</section>
      	</main>
	</React.Fragment>
  )
}

export default FetchApiCheatsheet;
