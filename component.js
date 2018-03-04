/**
* Class representing the Entire Page.
* @extends React.Component
*/
class Page extends React.Component {
  /**
  * @constructor
  * Gives an array of lists to start with
  */
  constructor (){
    super();
    this.state = {
      lists: [{title:"Title Example", desc:"Description Example", id:1}]
    };
  }
  render(){
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
  /**
  * Passes the array of list objects to the List component and pass values over as props
  */
  _getLists(){
    return this.state.lists.map((list) => {
      return <List
              key={list.id}
              id={list.id}
              title={list.title}
              desc={list.desc}
              deleteList={this._removeList.bind(this)}/>
    });
  }
  /**
  * Removes a To-Do list
  * @param {Integer} id   The id number of the to-do list to be removed.
  */
  _removeList(id){
    const li = this.state.lists.filter(
      (list) => list.id !== id
    );
    this.setState({
      lists: li
    });
  }
  /**
  * Adds a To-Do List
  * @param {String} listTitle The title of the to-do list
  * @param {String} listDesc The description of what the to-do list is for
  */
  _addList(listTitle,listDesc){
    const list = {
      title: listTitle,
      desc: listDesc,
      id: this.state.lists.length+1
    };
    this.setState({
      lists: this.state.lists.concat([list])
    });
  }
}
/**
* Class representing a specific To-Do List.
* @extends React.Component
*/
class List extends React.Component {
  /**
  * @constructor
  * starts with an empty array of items.
  */
  constructor(){
    super();
    this.state = {
      items: []
    };
  }
  render(){
    const items = this._getItems();
    return(
      <div className = "box-wrapper">
        <div className="list-box">
          <div className = "list-wrapper">
            <div className="list-title">{this.props.title}</div>
            <div className="list-desc">{this.props.desc}</div>
            <div>{items}</div>
            <form onSubmit={this._handleItemSubmit.bind(this)}>
              <input className="addItem" placeholder="Add Item." ref={item => this._item = item}/>
            </form>
            <form onSubmit={this._handleDeleteList.bind(this)}>
              <button className="btn-delete-list">Delete List.</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  /**
  * handles delete List event
  * @param {SyntheticEvent} event
  */
  _handleDeleteList(event){
    event.preventDefault();
    this.props.deleteList(this.props.id);
  }
  /**
  * Removes item from the items array
  * @param {Integer} itemId The id of the item to be removed
  */
  _removeThis(itemId){
    const item = this.state.items.filter(
      (item) => item.id !== itemId
    );
    this.setState({
      items: item
    });
  }
  /**
  * handles event of adding new items
  * @param {SyntheticEvent} event
  */
  _handleItemSubmit(event){
    event.preventDefault();
    this._addItem(this._item.value);
    this._item.value = '';
  }
  /**
  * The actual process that updates the this.state.items array
  * @param {String} itemBody The item body
  */
  _addItem(itemBody){
    const item = {
      body: itemBody,
      id: this.state.items.length+1
    }
    this.setState({
      items: this.state.items.concat([item])
    })
  }
  /**
  * Maps the items for the List and passes props to the Item Component
  */
  _getItems(){
    return this.state.items.map((item) => {
      return <Item
              body={item.body}
              key={item.id}
              id={item.id}
              removeThis={this._removeThis.bind(this)}/>
    });
  }
}
/**
* Class representing a specific Item in a to-do-list
* @extends React.Component
*/
class Item extends React.Component {
  render(){
    return (
      <div>
        <button className="btn-item"
           onClick={this._removeItem.bind(this)}>{this.props.id}.{this.props.body}</button>
      </div>
    );
  }
  /**
  * handles event of removing an item
  * @param {SyntheticEvent} event
  */
  _removeItem(event){
    event.preventDefault();
    this.props.removeThis(this.props.id);
  }
}
/**
* Class representing adding the secton of adding new to-do lists
* @extends React.Component
*/
class ListForm extends React.Component {
  render(){
    return(
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
  /**
  * handles the submit new form event
  * @param {SyntheticEvent} event
  */
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
/**
* Renders the Page component to an associated container in the index.html
*/
jQuery(function(){
  ReactDOM.render(
    <Page />,
    document.getElementById('page')
  );

});
