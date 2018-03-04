class Page extends React.Component {
  constructor (){
    super();
    this.state = {
      lists: []
    };
  }
  render(){
    return (
    <div>
      <h2> Your TO-DO List! </h2>
      <div>
        <List />
        <ListForm />
      </div>
    </div>
    );
  }
  //adds a list to an array of lists
  _addList(listAuthor,listBody){
    let list = {
      author: listAuthor,
      body: listBody,
      id: this.state.lists.length+1
    };
    this.setState({
      //will add the new list to the end of list object.
      lists: this.state.lists.concat([list])
    });
  }
}

class List extends React.Component {

  render(){
    return(
      <div>
        <div> I am a list. </div>
      </div>
    );
  }
}

class ListForm extends React.Component {

  render(){
    return(
    <div>
      <div className="listform-label">New List</div>
      <div className="listform">
        <div><input placeholder="List Title:"/></div>
        <div><textarea placeholder="Description:"/></div>
      </div>
      <div>
        <button type="submit">
          Add List.
        </button>
      </div>
    </div>
    );
  }
}

jQuery(function(){
  ReactDOM.render(
    <Page />,
    document.getElementById('page')
  );

});
