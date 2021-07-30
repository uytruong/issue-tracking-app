import { AngularEditorConfig } from '@kolkov/angular-editor';

export const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '120px',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '480px',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: false,
  placeholder: 'Enter text here...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']]
};