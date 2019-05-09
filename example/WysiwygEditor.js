import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';


class WysiwygEditor extends React.Component {
    constructor(props) {
        super(props);
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentBlock = htmlToDraft(html);        
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editorState
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this);

    }

    onEditorStateChange= function (editorState) {
        this.setState({
          editorState,
        });
      };

    render() {
        const { classes } = this.props;
        return (
            <Editor
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
  }

  
  WysiwygEditor.propTypes = {
  };
  
  export default WysiwygEditor;