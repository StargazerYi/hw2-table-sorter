/** Load the program **/
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

/** Get the content of the table **/
function getAllTables() {
    tables = document.getElementsByTagName("table");
    return tables;
}

/** Sort tables **/
function makeAllTablesSortable(tables) {
    var head = new Array();
    var flag = new Array(); // 0 is not visited, 1 is ascend, 2 is descend
    for (var i = 0; i < tables.length; i++) {
        head[i] = tables[i].getElementsByTagName("th");
        flag[i] = new Array();
        for (var j = 0; j < head[i].length; j++)
            flag[i][j] = 0;
    }

    for (var i = 0; i < head.length; i++) {
       for (var j = 0; j < head[i].length; j++) {
            head[i][j].onclick = function() {
                var tNum, cNum;
                for (var m = 0; m < tables.length; m++) {
                    for (var n = 0; n < head[m].length; n++) {
                        if (this == head[m][n]) {
                            tNum = m;
                            cNum = n;
                            break;
                        }
                    }
                }
                var last = changeCSS(head[tNum], cNum);
                if (last != -1)
                    flag[tNum][last] = 0;

				/** Get the row to be sorted and the sortby array **/
				var dstArray = new Array();
				var sortArray = new Array();
				dstArray = tables[tNum].getElementsByTagName("tr");
                //dstArray.shift();
                for (var m = 1; m < dstArray.length; m++) {
                    sortArray.push(dstArray[m].getElementsByTagName("td")[cNum].innerHTML);
                }

                setIcon(this, flag[tNum][cNum]);

				if (flag[tNum][cNum] == 0) {
					/** If the row is not sorted **/
					sortArray.sort();
                    
					for (var m = 0; m < sortArray.length; m++) {
						for (var n = 1; n < dstArray.length; n++) {
							if (dstArray[n].innerHTML.match(sortArray[m]) != null) {
								swap(dstArray[n], dstArray[m+1]);
							}
						}
					}

                    flag[tNum][cNum] = 1;
				} else if (flag[tNum][cNum] == 1) {
                    /** If the row has been sorted in an ascend order **/
					flag[tNum][cNum] = 2;
                    swap(dstArray[1], dstArray[3]);
				} else if (flag[tNum][cNum] == 2) {
					/** If the row has been sorted in a descend order **/
					flag[tNum][cNum] = 1;
					swap(dstArray[1], dstArray[3]);
				}
			}
		}
	}
}

/** Change the table's style **/
function changeCSS(head, i) {
    var last = -1;
	for (var j = 0; j < head.length; j++) {
		/** 
		 *Not the sortby column 
		 *css changes and remove the image on the right side
		**/
		if (i != j) {
			head[j].style.backgroundColor = "rgb(4, 26, 128)";
			var child = head[j].getElementsByTagName("img");
			if (child[0] != undefined) {
                head[j].removeChild(child[0]);
                last = j;
            }
		}

		/** 
		 *The sortby column
		 *Change background color
		**/
		if (i == j)
			head[j].style.backgroundColor = "rgb(168, 178, 240)";
	}

    return last;
}

function setIcon(current, flag) {
    var child = current.getElementsByTagName("img");

    if (flag == 0) {
        var img = document.createElement("img");
        img.src = "ascend.png";
        current.appendChild(img);
    } else if (flag == 1) {
        child[0].src = "descend.png";
    } else if (flag == 2) {
        child[0].src = "ascend.png";
    }
}

/** Swap two rows **/
function swap(a, b) {
	var tmp = a.innerHTML;
	a.innerHTML = b.innerHTML;
	b.innerHTML = tmp;
}