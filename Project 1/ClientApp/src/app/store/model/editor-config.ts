export class AngularEditorConfiguration  {
  public static config = 
    {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    enableToolbar: true,
    showToolbar: true,
    defaultFontSize: '3' ,
    toolbarHiddenButtons: [
      ['insertImage'],['insertVideo'],
      ],
      toolbarPosition:'top',
      outline: true,
  
    }
    
    public static configWithoutToolbar = 
    {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
   
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    enableToolbar: false,
    showToolbar: false,
    defaultFontSize: '3' ,    
      toolbarPosition:'top',
      outline: true,
      placeholder: 'Enter Description',
  
    }
  };
