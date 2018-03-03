let React = require('react');
let ReactDOM = require('react-dom');

class Page extends React.Component {

  constructor (){
    super();
    this.state = {

      lists: []
    };
  }
  ComponentWillMount(){
    console.log(3);
  }
  render(){
    return (
      <div>Hello World!</div>
    );
  }


}

jQuery(function(){
  ReactDOM.render(
    <Page />,
    document.getElementID('page')
  );

})
