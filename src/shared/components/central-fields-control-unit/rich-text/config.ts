const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image',
];

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown with default font sizes
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],  // additional list style: checklist
        [{ 'indent': '-1' }, { 'indent': '+1' }],  // outdent/indent
        [{ 'align': [] }],
        ['link', 'image',],
    ],
    clipboard: {
        matchVisual: false,
    },
};
export { formats, modules }