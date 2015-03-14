/**
 * Created by air on 15/3/12.
 */


//全局变量

var sortSeq = new Array(0,0,0,0,0,0);
/**
 *	@var sortSeq
 *	@brief 用于存储table中6个column被点击过的次数
 */

var origin = new Array();
/**
 *	@var origin
 *	@brief 用于存储原始的数组排列
 */

var symbol = document.createElement("div");
/**
 *	@var symbol
 *	@brief 出现箭头的div
 */


function dSort(){
    /**
     * @fn      dSort()
     * @brief   把输入的数组进行按照升序或者降序进行排序，
     * @parm    [0]哪一个表格 1or2，[1]sort哪一列
     * @return  无
     */
    var parent = document.getElementById("todo").firstElementChild.nextElementSibling;
    var tableNumber = arguments[0];
    sortSeq[arguments[1]]++;
    var method = (sortSeq[arguments[1]]%3);


    if (tableNumber == 1){
        switch (method){
            case 1:
                //升序
                array1.sort(ascend(arguments[1],1));
                showAscend(arguments[1]);
                break;
            case 2:
                array1.sort(descend(arguments[1],1));
                showDescend(arguments[1]);
                break;
            case 0:
                var cur = new Array();
                cur.push(origin[0],origin[1],origin[2]);
                var check = new Array();
                for (a in cur){
                    for (b in array1){
                        array1[b] === cur[a];
                        check.push(array1[b]);
                    }
                }
                array1 = check;
                recover(arguments[1],1);
                break;
        }
        var oFrag = document.createDocumentFragment();
        var curArray = new Array();
        for(var k=0;k<3 ;k++){
            var clone = array1[k].cloneNode(true);
            oFrag.insertBefore(clone);
            parent.removeChild(array1[k]);
            curArray.push(clone);
        }
        parent.appendChild(oFrag);
        array1 = curArray;

    } else {
        parent = document.getElementById("staff").firstElementChild.nextElementSibling;
        switch (method){
            case 1:
                //升序
                array2.sort(ascend(arguments[1]));
                showAscend(arguments[1],2);
                break;
            case 2:
                array2.sort(descend(arguments[1]));
                showDescend(arguments[1],2);
                break;
            case 0:
                var cur = new Array();
                cur.push(origin[0],origin[1],origin[2]);
                var check = new Array();
                for (a in cur){
                    for (b in array2){
                        array2[b] === cur[a];
                        check.push(array2[b]);
                    }
                }
                array2 = check;
                recover(arguments[1],2);
                break;
        }
        var oFrag = document.createDocumentFragment();
        var curArray = new Array();
        for(var k=0;k<3 ;k++){
            var clone = array2[k].cloneNode(true);
            oFrag.insertBefore(clone);
            parent.removeChild(array2[k]);
            curArray.push(clone);
        }
        parent.appendChild(oFrag);
        array2 = curArray;

    }
    setColor();
}
function getObj(){

}

function ascend(num){
    /**
     * @fn      ascend()
     * @brief   升序排列对象字符串使用
     * @parm    a,b，两个对象
     * @return  -1表示第一个对象在前，1表示第一个对象在后
     */
    return function(a,b){

        var now = num-1;
        var first = a.firstElementChild;
        var second = b.firstElementChild;
        while(1) {
            if(now == 0) break;
            first = first.nextElementSibling;
            second = second.nextElementSibling;
            now--;
        }

        first = first.innerHTML;
        second = second.innerHTML;
        var array = new Array(first,second);
        array.sort();
        if (array[0] == first){
            return -1;
        } else {
            return 1;
        }
    }

}

function descend(num){
    /**
     * @fn      descend()
     * @brief   降序排列对象字符串使用
     * @parm    a,b，两个对象
     * @return  -1表示第一个对象在前，1表示第一个对象在后
     */
    return function(a,b){

        var now = num-1;
        var first = a.firstElementChild;
        var second = b.firstElementChild;
        while(1) {
            if(now == 0) break;
            first = first.nextElementSibling;
            second = second.nextElementSibling;
            now--;
        }

        first = first.innerHTML;
        second = second.innerHTML;
        var array = new Array(first,second);
        array.sort();
        if (array[0] == first){
            return 1;
        } else {
            return -1;
        }
    }
}

function setColor(){
    /**
     * @fn      setColor()
     * @brief   给表格隔行渲染灰色颜色
     * @parm    无
     * @return  无
     */
    for (k in array1){
        array1[k].bgColor = "white";
    }
    array1[1].setAttribute("bgColor","lightgrey");
    for (k in array2){
        array2[k].bgColor = "white";
    }
    array2[1].setAttribute("bgColor","lightgrey");
}

function showAscend(col,table){
    /**
     * @fn      showAscend()
     * @brief   出现升序时的箭头
     * @parm    col 用于确定哪一列;table 用于确定是哪一个table
     * @return  无
     */
    var cur;
    if (table == 2) {
        cur = document.getElementById("staff").firstElementChild.firstElementChild.firstElementChild;
    }else {
        cur = document.getElementById("todo").firstElementChild.firstElementChild.firstElementChild;
    }
    col--;
    while(col--) {
        cur = cur.nextElementSibling;
    }
    symbol.setAttribute("class","ascend");
    cur.appendChild(symbol);
    clearColor();
    cur.bgColor = "lightblue";

}

function showDescend(col,table){
    /**
     * @fn      showDescend()
     * @brief   出现降序时的箭头
     * @parm    col 用于确定哪一列;table 用于确定是哪一个table
     * @return  无
     */
    var cur;
    if (table == 2) {
        cur = document.getElementById("staff").firstElementChild.firstElementChild.firstElementChild;
    }else {
        cur = document.getElementById("todo").firstElementChild.firstElementChild.firstElementChild;
    }
    col--;
    while(col--) {
        cur = cur.nextElementSibling;
    }
    symbol.setAttribute("class","descend");
    cur.appendChild(symbol);
    clearColor();
    cur.bgColor = "lightblue";
}

function recover(col,table){
    /**
     * @fn      recover()
     * @brief   用于清除箭头
     * @parm    col 用于确定哪一列;table 用于确定是哪一个table
     * @return  无
     */
    var cur;
    if (table == 2) {
        cur = document.getElementById("staff").firstElementChild.firstElementChild.firstElementChild;
    }else {
        cur = document.getElementById("todo").firstElementChild.firstElementChild.firstElementChild;
    }
    col--;
    while(col--) {
        cur = cur.nextElementSibling;
    }
    cur.removeChild(symbol);

    clearColor();
}

function clearColor(){
    /**
     * @fn      clearColor()
     * @brief   用于把表头的颜色转换清除
     * @parm    无
     * @return  无
     */
    var cur1 = document.getElementById("staff").firstElementChild.firstElementChild.firstElementChild;
    var cur2 =document.getElementById("todo").firstElementChild.firstElementChild.firstElementChild;
    for(var c=0;c<3;c++){
        cur1.bgColor = "darkblue";
        cur2.bgColor = "darkblue";
        cur1 = cur1.nextElementSibling;
        cur2 = cur2.nextElementSibling;
    }

}

function getAllTables(){
    /**
     * @fn      getAllTables()
     * @brief   把页面的tableDOM存在对象数组中
     * @parm    无
     * @return  获得的table
     */
    var table = new Array();
    //第一个表格
    var todo = document.getElementById("todo");
    //第二个表格
    var staff = document.getElementById("staff");
    table.push(todo);
    table.push(staff);
    return table;
}

function makeAllTablesSortable(tables){
    /**
     * @fn      makeAllTablesSortable()
     * @brief   使用js的DOM操作，把基本所有需要操作的DOM的引用赋给变量
     * @parm    表格
     * @return  无
     */
    //第一个表格
    //for (var k =0;k<tables.length;k++) {
        var click = tables[0];
        var th_1 = click.firstElementChild.firstElementChild.firstElementChild;
        var th_2 = th_1.nextElementSibling;
        var th_3 = th_2.nextElementSibling;

        th_1.setAttribute("onclick", "dSort(1,1)");
        th_2.setAttribute("onclick", "dSort(1,2)");
        th_3.setAttribute("onclick", "dSort(1,3)");

        var tr1_1 = click.firstElementChild.nextElementSibling.firstElementChild;
        var tr1_2 = tr1_1.nextElementSibling;
        var tr1_3 = tr1_2.nextElementSibling;

        //第二个表格
        var click = tables[1];
        var th_firstName = click.firstElementChild.firstElementChild.firstElementChild;
        var th_lastName = th_firstName.nextElementSibling;
        var th_firstCheckI = th_lastName.nextElementSibling;

        th_firstName.setAttribute("onclick", "dSort(2,1)");
        th_lastName.setAttribute("onclick", "dSort(2,2)");
        th_firstCheckI.setAttribute("onclick", "dSort(2,3)");

        var tr2_1 = click.firstElementChild.nextElementSibling.firstElementChild;
        var tr2_2 = tr2_1.nextElementSibling;
        var tr2_3 = tr2_2.nextElementSibling;
    //}
    //把获得的表格行存进全局变量array中
    array1 = new Array(tr1_1,tr1_2,tr1_3);
    array2 = new Array(tr2_1,tr2_2,tr2_3);
    var curOrigin = new Array(tr1_1,tr1_2,tr1_3,tr2_1,tr2_2,tr2_3);
    for (k in curOrigin){
        origin.push(curOrigin[k].cloneNode(true));
    }
    setColor();
}

window.onload = function () {
    /**
     * @fn      onload()
     * @brief   js的入口函数
     * @parm    无
     * @return  无
     */
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}