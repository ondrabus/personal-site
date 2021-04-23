import Head from 'next/head';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

const ReactVueAngularCheatsheet: any  = () => {

  useEffect(() => {
	hljs.initHighlighting();
  }, []);
  return (
	  <React.Fragment>
		<Head>
			<title>React Vue Angular to HTML cheatsheet - Ondrabus</title>
			<meta property="og:title" content="React Vue Angular to HTML cheatsheet - Ondrabus" />
			<link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/default.min.css"></link>
		</Head>
		
		<main>
        	<section className="content cheatsheet js-frameworks"> 
    			<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}>
      				<h1>React Vue Angular to HTML cheatsheet</h1>
					<p>Download printable version: <a href="/pdf/cheatsheet-react.pdf" title="Printable React to HTML cheatsheet">React (PDF, 0.9MB)</a>, <a href="/pdf/cheatsheet-vue.pdf" title="Printable Vue to HTML cheatsheet">Vue.js (PDF, 0.7MB)</a>, <a href="/pdf/cheatsheet-angular.pdf" title="Printable Angular to HTML cheatsheet">Angular (PDF, 0.7MB)</a></p>
					<table cellSpacing="10">
						<thead>
							<tr>
								<th className="code">React</th>
								<th className="code">Vue</th>
								<th className="code">Angular</th>
								<th className="desc"></th>
							</tr>
						</thead>
						<tbody>
						<tr>
							<td>
								<pre><code className="js">{`{ variable }`}</code>
<code className="js example">{`{ metadata.subtitle.value }`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`{{ variable }}`}</code>
<code className="js example">{`{{ metadata.subtitle.value }}`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`{{ variable }}`}</code>
<code className="js example">{`{{ metadata.subtitle.value }}`}</code></pre>
							</td>
							<td>outputting data into HTML</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">{`< ... name={variable}>`}</code>
<code className="js example">{`<a href={\`https://twitter.com/\${author.twitter.value}\`}>`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`< ... :name="variable">`}</code>
<code className="js example">{`<a :href="\`https://twitter.com/\${author.twitter.value}\`">`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`< ... [attr.name]="variable">`}</code>
<code className="js example">{`<a [attr.href]="\`https://twitter.com/\${author.twitter.value}\`">`}</code></pre>
							</td>
							<td>outputting data into HTML attributes</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">{`< ... dangerouslySetInnerHTML={{__html: variable}}></...>`}</code>
<code className="js example">{`<div dangerouslySetInnerHTML={{__html: article.teaser}}></div>`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`< ... v-html="variable"></...>`}</code>
<code className="js example">{`<div v-html="article.teaser"></div>`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`< ... [innerHTML]="variable"></...>`}</code>
<code className="js example">{`<div [innerHTML]="article.teaser"></div>`}</code></pre>
							</td>
							<td>outputting HTML</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">{`const components = collectionVariable.map((item) => <Component data={item} key={item.uniqueKey} />);
...
<div>{components}</div>`}</code>
<code className="js example">{`const articleComponents = articles.map((article) => <Article data={article} key={article.id} ... />);
...
<div>{articleComponents}</div>`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`< ... v-for="item in collectionVariable" :key="item.uniqueKey">`}</code>
<code className="js example">{`<article v-for="article in articles" :key="article.id" ... >`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`< ... *ngFor="let item of collectionVariable">`}</code>
<code className="js example">{`<article *ngFor="let article of articles" ... >`}</code></pre>
							</td>
							<td>iterating over data sets</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">{`const components = collectionVariable.map((item, index) => <Component data={item} key={item.uniqueKey} index={index} />);
...
<div>{components}</div>`}</code>
<code className="js example">{`const articleComponents = articles.map((article) => <Article data={article} key={article.id} index={index} ... />);
...
<div>{articleComponents}</div>`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`< ... v-for="(item, index) in collectionVariable" :key="item.id">`}</code>
<code className="js example">{`<article v-for="(article, index) in articles" :key="article.id" ... >`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`< ... *ngFor="let item of collectionVariable; let i = index">`}</code>
<code className="js example">{`<article *ngFor="let article of articles; let i = index" ... >`}</code></pre>
							</td>
							<td>iterating over data sets with index</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">{`{variable !== null && <... >}`}</code>
<code className="js example">{`{data.length > 0 && <div> ... </div>}`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`<... v-if="variable !== null">`}</code>
<code className="js example">{`<div v-if="data.length > 0"> ... </div>`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`<... *ngIf="variable !== null">`}</code>
<code className="js example">{`<div *ngIf="data.length > 0"> ... </div>`}</code></pre>
							</td>
							<td>rendering conditional markup</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">{`{variable !== null && <... >}
{variable == null && <... >}`}</code>
<code className="js example">{`{data.length > 0 && <div> ... </div>}
{data.length == 0 && <div>Loading...</div>}`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`<... v-if="variable !== null"> ...
<... v-else>`}</code>
<code className="js example">{`<div v-if="data.length > 0"> ... </div>
<div v-else>Loading...</div>`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`<... *ngIf="variable !== null;else codename"> ...
<ng-template #codename>`}</code>
<code className="js example">{`<div *ngIf="data.length > 0;else show_loading"> ... </div>
<ng-template #show_loading>Loading...</ng-template>`}</code></pre>
							</td>
							<td>rendering conditional markup including else branch</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">{`<... className="classname">`}</code>
<code className="js example">{`<div className="sidebar__inner">`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`<... class="classname">`}</code>
<code className="js example">{`<div class="sidebar__inner">`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`<... class="classname">`}</code>
<code className="js example">{`<div class="sidebar__inner">`}</code></pre>
							</td>
							<td>adding standard class attribute</td>
						</tr>
						<tr>
							<td>
								<pre><code className="js">{`<component componentVariable={variable}>`}</code>
<code className="js example">{`<links author={author}>`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`<component :componentVariable="variable">`}</code>
<code className="js example">{`<links :author="author">`}</code></pre>
							</td>
							<td>
								<pre><code className="js">{`<component [componentVariable]="variable">`}</code>
<code className="js example">{`<links [author]="author">`}</code></pre>
							</td>
							<td>passing data to child components</td>
						</tr>
						</tbody>
					</table>
					
    			</motion.div>
			</section>
      	</main>
	</React.Fragment>
  )
}

export default ReactVueAngularCheatsheet;
