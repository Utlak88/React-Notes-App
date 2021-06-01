import React, {
    Component,
    useState,
    useEffect
} from 'react';
import './index.css';

const noteList = [{
    name: '',
    status: '',
}, ];

function NotesApp() {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [count, setCount] = useState(0);
    const [list, setList] = useState(noteList);
    const [activeList, setActiveList] = useState([]);
    const [completedList, setCompletedList] = useState([]);

    function handleNameChange(updateName) {
        setName(updateName.target.value);
    };

    function handleStatusChange(updateStatus) {
        setStatus(updateStatus.target.value);
    };

    function handleAdd() {
        if (count === 0) {
            const newList = [{
                name,
                status,
            }, ];
            setList(newList);
            if (status.toLowerCase() === 'active') {
                activeList.push({
                    name: name,
                    status: status
                })
            } else if (status.toLowerCase() === 'completed') {
                completedList.push({
                    name: name,
                    status: status
                })
            }
        } else {
            var table_entry = [{
                name: name,
                status: status,
            }, ];
            list.push(table_entry[0]);

        };
        if (list[count]['status'].toLowerCase() === 'active') {
            activeList.push(list[count])
        } else if (list[count]['status'].toLowerCase() === 'completed') {
            completedList.push({
                name: name,
                status: status
            })
        };
        setCount(count + 1);
        setName('');
        setStatus('');
    };

    function showCompleted() {
        var addRowsCode = "";
        for (var i = 0; i < completedList.length; i++) {
            addRowsCode += "<td>" + completedList[i]['name'] + "</td>";
            addRowsCode += "<td>" + completedList[i]['status'] + "</td></tr>";
        };
        document.getElementById("tableRows").innerHTML = addRowsCode;
    };

    function showActive() {
        var addRowsCode = "";
        for (var i = 0; i < activeList.length; i++) {
            addRowsCode += "<td>" + activeList[i]['name'] + "</td>";
            addRowsCode += "<td>" + activeList[i]['status'] + "</td></tr>";
        };
        document.getElementById("tableRows").innerHTML = addRowsCode;
    };

    function showAll() {
        const allList = []
        if (count === 0) {

            var addRowsCode = "<tr>";
            addRowsCode += "<td>" + name + "</td>";
            addRowsCode += "<td>" + status + "</td></tr>";

            document.getElementById("tableRows").innerHTML = addRowsCode;
        } else {
            for (var i = 0; i < activeList.length; i++) {
                allList.push(activeList[i])

            };
            for (var i = 0; i < completedList.length; i++) {
                allList.push(completedList[i])
            };
            for (var i = 0; i < list.length; i++) {
                if (list[i]['status'].toLowerCase() !== 'active' && list[i]['status'].toLowerCase() !== 'completed') {
                    allList.push(list[i])

                };
            };
            var addRowsCode = "";
            for (var i = 0; i < allList.length; i++) {
                addRowsCode += "<td>" + allList[i]['name'] + "</td>";
                addRowsCode += "<td>" + allList[i]['status'] + "</td></tr>";
            };
            document.getElementById("tableRows").innerHTML = addRowsCode;
        }
    };

    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <form>
          <input
            data-testid="input-note-name"
            type="text"
            className="large mx-8"
            placeholder="Note Name"
            value={ name }
            onChange={handleNameChange}
          />
          <input
            data-testid="input-note-status"
            type="text"
            className="large mx-8"
            placeholder="Note Status"
            value={ status }
            onChange={handleStatusChange}
          />
          <button onClick={function(event){ handleAdd(); showAll()}} /*{handleAdd}*/ type="button" className="" data-testid="submit-button">Add Note</button>
          </form>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li onClick={showAll}
              className="tab-item slide-up-fade-in"
              data-testid="allButton"
            >
              All
            </li>
            <li onClick={showActive}
              className="tab-item slide-up-fade-in"
              data-testid="activeButton"
            >
              Active
            </li>
            <li onClick={showCompleted}
              className="tab-item slide-up-fade-in"
              data-testid="completedButton"
            >
              Completed
            </li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table id="Table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody id="tableRows" data-testid="noteList">
            </tbody>
          </table>
        </div>
      </div>
    );
  }

export default NotesApp