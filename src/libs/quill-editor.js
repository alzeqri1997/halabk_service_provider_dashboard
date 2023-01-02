import Vue from "vue";
import { quillEditor } from "vue-quill-editor";
// eslint-disable-next-line
import "quill/dist/quill.core.css";
// eslint-disable-next-line
import "quill/dist/quill.snow.css";
// eslint-disable-next-line
import "quill/dist/quill.bubble.css";
Vue.component("quill-editor", quillEditor);
