import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Tree from 'react-ui-tree';
import 'react-ui-tree/dist/react-ui-tree.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import tree from './tree';
import cx from 'classnames';
import CustomTextField from './CustomTextField';

class SimpleTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      tree: tree,
      value: 0,
      dialogOpen: false,
      tagName: '',
      selectedNode: null,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.confirmCreate = this.confirmCreate.bind(this);
  }
  

  renderNode = node => {
    return (
      <div>
        <span
          className={cx('node', {
            'is-active': node === this.state.active
          })}
          onClick={this.onClickNode.bind(null, node)}
          >
          {node.module}
        </span>
        {(!node.leaf || node.leaf ==false) && <AddIcon style={{height: '20px', position: 'absolute', marginLeft: '100px', color: 'red'}} onClick={() => this.handleOpen(node)}/>}
      </div>
    );
  };

  addNewItem = function (node) {
    var moduleName = node ? node.module : null;
    var temp = JSON.parse(JSON.stringify(tree));
    
    this.parseAndUpdateTree(tree, moduleName, []);
    const updatedTree = this.state.tree;
    this.setState({tree: {}}, () => this.setState({tree: updatedTree})); 
  }

  parseAndUpdateTree =  function(temp, moduleName, path) {
    if(temp.module == moduleName) {
      console.log('here1');
      if(!temp.children) {
        temp.children = [];
      }
      temp.children.push({module: this.state.tagName});
      var i = 0;
      var tempObj = this.state.tree;
      while(i < path.length) {
        tempObj = tempObj.children[path[i]];
        i++;
      }
      return;
    }
    for(var i in temp.children) {
      var updatedPath = [...path];
      updatedPath.push(i);
      var child = temp.children[i];
      this.parseAndUpdateTree(child, moduleName, [...updatedPath]);
    }
  }

  onClickNode = node => {
    console.log(node);
    
    this.setState({
      active: node
    });
  };

  handleChange = (event, value) => {
    console.log("came here", value);
    if(value) {
      this.setState({ value });
    }
  };

  handleClose() {
    this.setState({ dialogOpen: false });
  }

  handleOpen(node) {
    this.setState({ dialogOpen: true, tagName: '', selectedNode: node });
  }

  confirmCreate() {
    this.addNewItem(this.state.selectedNode);
    this.setState({ dialogOpen: false });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root} >
        <div className="tree">
          <Grid container  style={{marginTop: '50px'}}>
            <Grid item>
              <Tabs value={value} onChange={this.handleChange} classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }} style={{width: '100%'}}>
                <Tab label="All" classes={{ root: classes.tabRoot, selected: classes.tabSelected }}/>
                <Tab label="Board" classes={{ root: classes.tabRoot, selected: classes.tabSelected }} />
                <Tab label="Graph" classes={{ root: classes.tabRoot, selected: classes.tabSelected }}/>
                <Tab label="Recent" classes={{ root: classes.tabRoot, selected: classes.tabSelected }}/>
              </Tabs>
            </Grid>
          </Grid>
          {/* {value === 0 && <TabContainer>Item One</TabContainer>}
          {value === 1 && <TabContainer>Item Two</TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>} */}
          <br/>
          <Tree
            paddingLeft={20}
            tree={this.state.tree}
            onChange={this.handleChange}
            isNodeCollapsed={false}
            renderNode={this.renderNode}
          />
        </div>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="ingestion-alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="ingestion-alert-dialog-title" style={{ minWidth: '500px' }}>Create Tag</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <CustomTextField
                value={this.state.tagName}
                handleChange={() => this.setState({ tagName: event.target.value })}
                label="Tag"
                placeholder="Type"
                disable={false}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} style={{ marginBottom: '10px', marginRight: '20px' }}>
                    Cancel
                </Button>
            <Button onClick={this.confirmCreate} style={{ marginBottom: '10px', marginRight: '20px' }}>
                    Create
                </Button>
          </DialogActions>
        </Dialog>
      </div>);
    }
  }

  function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

  const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
      borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
      backgroundColor: 'red',
    },
    tabRoot: {
      textTransform: 'initial',
      fontWeight: theme.typography.fontWeightRegular,
      minWidth: 30,
      padding: 0,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$tabSelected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    tabSelected: {},
    typography: {
      padding: theme.spacing.unit * 3,
    },
  });
  
  SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleTabs);