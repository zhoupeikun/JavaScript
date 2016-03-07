var TableView = function (id, tableModel) {
    this.model = tableModel;

    this.div = document.createElement("div");
    this.div.id = "spreadsheet-div";


    var target = document.getElementById(id);
    if (target)
	target.appendChild(this.div);


    this.input = document.createElement("input");
    this.input.type = "text";
    this.div.appendChild(this.input);

    this.button = document.createElement("button");
    this.button.innerHTML = "&#10003;";
    this.div.appendChild(this.button);

    //add five button 
    this.button1= document.createElement("button");
    this.button1.innerHTML = "gras"; 
    this.div.appendChild(this.button1);

    this.button = document.createElement("button");
    this.button.innerHTML = "italique";
    this.div.appendChild(this.button);

    this.button = document.createElement("button");
    this.button.innerHTML = "souligne";
    this.div.appendChild(this.button);

    this.button = document.createElement("button");
    this.button.innerHTML = "choix de couleur du texte";
    this.div.appendChild(this.button);

    this.button = document.createElement("button");
    this.button.innerHTML = "choix du couleur du fond de case";
    this.div.appendChild(this.button);

    this.table = document.createElement("table");
    this.div.appendChild(this.table);
};

TableView.prototype.createTable = function () {
    var model = this.model;
    var table = this.table;


    //Clear the table

    for (var c = table.firstChild; c != null; c = c.nextSibling)
        table.removeChild(c);



    var thead = document.createElement("thead");
    table.appendChild(thead);

    var tr = document.createElement("tr");
    thead.appendChild(tr);
    tr.appendChild(document.createElement("th"));

    model.forEachCol(function (c) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(c));
        tr.appendChild(th);
    });

    var tbody = document.createElement("tbody");
    table.appendChild(tbody);

    model.forEachRow(function (j) {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);
        var td = document.createElement("td");
        var text = document.createTextNode(j);
        td.appendChild(text);
        tr.appendChild(td);
        model.forEachCol(function (i) {
            var cell = model.getCell(i,j);
            var td = document.createElement("td");
            cell.setView(td);

	    //monkey patching
            td.row = j;
            td.col = i;

            td.notify = function (cell) {
                td.firstChild.nodeValue = cell.getValue();
            };

            td.isSelected = function () {
                return this.classList.contains("selected");
            };

            td.select = function (b) {
                if (b)
                    this.classList.add("selected");
                else
                    this.classList.remove("selected");
            };

            var text = document.createTextNode(cell.getValue());
            td.appendChild(text);
            tr.appendChild(td);
        });

    });


};
