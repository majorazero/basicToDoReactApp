class Page extends React.Component {
  constructor (){
    super();
    this.state = {
      lists: []
    };
  }
  render(){
    //calls the custom function to parse your array.
    const lists = this._getLists();
    return (
    <div className = "box">
      <div className = "wrapper">
        <h2> Your TO-DO List! </h2>
        <div className = "listObj"> Your Lists </div>
        <div>{lists}</div>
        <div>
          <div className = "bars"></div>
          {/*Passed the _addList function to the ListForm child component as a props called "addList"*/}
          <ListForm addList={this._addList.bind(this)}/>
        </div>
      </div>
    </div>
    );
  }

  _getLists(){
    return this.state.lists.map((list) => {
      return <List
              key={list.key}
              title={list.title}
              desc={list.desc}/>
    });
  }
  //adds a list to an array of lists
  _addList(listTitle,listDesc){
    const list = {
      title: listTitle,
      desc: listDesc,
      key: this.state.lists.length+1
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
      <div className="list-box">
        <div className = "list-wrapper">
          <div className="list-title">{this.props.title}</div>
          <div className="list-desc">{this.props.desc}</div>
          <button className="btn-delete-list">DELETE.</button>
        </div>
      </div>
    );
  }
}

class ListForm extends React.Component {
  render(){
    return(
    //note that if you don't wrap it all in form, it will not submit properly
    //call the _handleSubmit function on submit.
    <form className="lForm" onSubmit={this._handleSubmit.bind(this)}>
      <div className="listform-label">New List</div>
      <div className="listform">
        <div><input placeholder="List Title:" ref={title => this._title = title}/></div>
        <div><textarea placeholder="Description:"ref={body => this._desc = body}/></div>
      </div>
      <div>
        <button className="btn-listform"type="submit">
          Add List.
        </button>
      </div>
    </form>
    );
  }

  _handleSubmit(event){
    //prevents page from resetting
    event.preventDefault();
    //uses the inherited function
    this.props.addList(this._title.value,this._desc.value);
    //reset data here so you can input new data
    this._title.value = '';
    this._desc.value = '';
  }
}

jQuery(function(){
  ReactDOM.render(
    <Page />,
    document.getElementById('page')
  );

});
