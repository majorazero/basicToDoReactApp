class Page extends React.Component {
  constructor (){
    super();
    this.state = {
      lists: [{title:"Womp", desc:"yep"}]
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
  //the function of getting the list.
  _getLists(){
    return this.state.lists.map((list) => {
      return <List
              key={list.id}
              title={list.title}
              desc={list.desc}/>
    });
  }
  //adds a list to an array of lists
  _addList(listTitle,listDesc){
    const list = {
      title: listTitle,
      desc: listDesc,
      id: this.state.lists.length+1
    };
    this.setState({
      //will add the new list to the end of list object.
      lists: this.state.lists.concat([list])
    });
  }
}

class List extends React.Component {
  constructor(){
    super();
    this.state = {
      items: [{body:"whoa",id:1}]
    };
  }
  render(){
    const items = this._getItems();
    return(
      <div className="list-box">
        <div className = "list-wrapper">
          <div className="list-title">{this.props.title}</div>
          <div className="list-desc">{this.props.desc}</div>
          <div>{items}</div>
          <button className="btn-add-list">Add Item.</button>
          <button className="btn-delete-list">Delete List.</button>
        </div>
      </div>
    );
  }
  _getItems(){
    return this.state.items.map((item) => {
      return <Item
              body={item.body}
              key={item.id}
              removeThis={this._removeThis.bind(this)}
      />
    });
  }
  _addItem(itemBody){
    const item = {
      body: itemBody,
      id: this.state.items.length+1
    }
    this.setState({
      items: this.state.items.concat([item])
    })
  }
  _removeThis(itemId){
    const item = this.state.items.filter(
      (item) => item.id == itemId
    );
    this.setState({
      items: item
    })
  }
}

class Item extends React.Component {
  render(){
    return (
      <div>
        <button onClick={this._removeItem.bind(this)}>{this.props.body}</button>
      </div>
    );
  }
  _removeItem(event){
    event.preventDefault();
    this.props.removeThis(this.props.id);
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
