<template>
	<div id="app">
		<nav class="navbar navbar-inverse navbar-static-top">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="/">Serialized Editor</a>
				</div>
				<div class="collapse navbar-collapse" id="navbar-collapse-1">
					<div class="navbar-right">
						<p class="navbar-text">
							Made by <a href="https://deliciousbrains.com/" target="_blank" class="navbar-link delicious-brains">Delicious Brains</a>
						</p>
						<div class="addthis_inline_share_toolbox"></div>
					</div>
				</div>
			</div>
		</nav>

		<div class="content container-fluid">
			<div class="row equal">
				<div class="col-sm-12 col-md-3 no-padding">
					<div class="serialized-input">
						<textarea v-model="input" placeholder="Enter serialized data..."></textarea>
					</div>
				</div>
				<div class="col-sm-12 col-md-6">
					<div class="serialized-editor-wrapper">
						<div class="alert alert-info" v-if="!input">
							<p>Enter data that has been serialized using PHP's <a href="http://php.net/manual/en/function.serialize.php"><code>serialize</code></a> function on the left. You can then edit the data using the visual editor and copy the resulting serialized output from the right.</p>
							<button type="button" class="btn btn-primary" @click="useSampleData">Use sample data</button>
						</div>
						<div class="alert alert-danger" v-if="error">
							Invalid serialized data
						</div>
						<serialized-editor :json-data="parsedData" @output="updateOutput"></serialized-editor>
					</div>
					<div class="serialized-editor-footer">
						<a href="https://deliciousbrains.com/announcing-serializededitor-com-visual-editor-php-serialized-data/">Why?</a> /
						<a href="https://github.com/deliciousbrains/serialized-editor">GitHub</a> /
						<a href="#" data-toggle="modal" data-target="#privacy-modal">Privacy</a>
					</div>
				</div>
				<div class="col-sm-12 col-md-3 no-padding">
					<div class="serialized-output">
						<textarea v-model="output" placeholder="Serialized output will appear here..." readonly></textarea>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="privacy-modal" tabindex="-1" role="dialog" aria-labelledby="privacy-modal-label">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="privacy-modal-label">Privacy Policy</h4>
					</div>
					<div class="modal-body">
						<p>We take the privacy and security of your data very seriously. As such we do not store or transmit any of the data you enter on serializededitor.com to any other location (it doesn't even reach our servers).</p>

						<p>We use Google Analytics (a web analysis service of Google Inc.) to collect anonymized information about our visitors using cookies.</p>

						<p>We use the AddThis social sharing widget. See <a href="http://www.addthis.com/privacy/privacy-policy" target="_blank">their privacy policy</a>.</p>

						<p>We follow the practices outlined in the <a href="https://deliciousbrains.com/privacy-policy/" target="_blank">Delicious Brains Privacy Policy</a>.</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.serialized-input,
	.serialized-output {
		height: 100%;
	}
	.serialized-input textarea,
	.serialized-output textarea {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 20px;
		background: #2f3843;
		color: rgba(255,255,255,0.9);
		border: 0;
		outline: none;
	}
	.serialized-editor-wrapper {
		padding-top: 20px;
		margin-bottom: 80px;
	}
	.no-padding { padding: 0; }
	.serialized-editor-footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		text-align: center;
		margin-bottom: 30px;
		color: #aaa;
	}
	.serialized-editor-footer a {
		color: #aaa;
		text-decoration: underline;
	}
	.serialized-editor-footer a:hover {
		color: #777;
	}
</style>

<script>
	import { SerializedParser, SerializedEditor } from '../dist/serialized-editor';

	export default {
		data: function() {
			return {
				input: '',
				output: '',
				sampleData: 'a:8:{s:4:"null";N:null;s:3:"int";i:123;s:6:"string";s:3:"foo";s:4:"bool";b:1;s:5:"array";a:1:{s:3:"foo";s:3:"bar";}s:6:"object";O:8:"stdClass":1:{s:3:"foo";s:3:"bar";}s:6:"class1";O:13:"ExampleClass1":3:{s:23:"ExampleClass1privateVar";s:16:"private variable";s:13:"*protectedVar";s:18:"protected variable";s:9:"publicVar";s:15:"public variable";}s:6:"class2";O:13:"ExampleClass2":3:{s:23:"ExampleClass2privateVar";s:16:"private variable";s:13:"*protectedVar";s:18:"protected variable";s:9:"publicVar";s:15:"public variable";}}',
				error: false,
			}
		},

		computed: {
			parsedData() {
				if (!this.input) {
					return {};
				}

				var sp = new SerializedParser(this.input);

				try {
					var json = sp.parse();
					return JSON.parse(json);
				} catch (e) {
					this.error = true;
					console.error(e);
				}

				return {};
			}
		},

		methods: {
			updateOutput(output) {
				this.output = output;
			},
			useSampleData() {
				this.input = this.sampleData;
			}
		},

		watch: {
			input() {
				this.error = false;
			}
		},

		components: {
			'serialized-editor': SerializedEditor
		}
	}
</script>
