/**
 * 计算注数
 */
var $tmp;
var num;
var count_num = {
    change:function(num){
        return num;
    },
    mul:function(detail){
        //{1,2,3,4,5}
        var num = 1;
        detail.split(',').map(v => {
          num = num * v.split('-').length;
        })
        return num;
    },
    shiyi_mul:function(detail){

        //{1,2,3,4,5}
        var num = 0;
        var new_detail = [];
        detail = detail
        $(detail.split(',')).each(function(i,v){

            if(v != '')
            {
                new_detail[new_detail.length] = v.split('-');
            }

        })

        $(new_detail[0]).each(function(i,v){
            $(new_detail[1]).each(function(i1,v1){
                $(new_detail[2]).each(function(i2,v2){
                    if(v == v1 || v1 == v2 || v2 == v)
                    {
                    } else {
                        num++;
                    }
                })
            })
        })
        return num;
    },
    shiyi_mul_4:function(detail){

        //{1,2,3,4,5}
        var num = 0;
        var new_detail = [];
        detail = detail
        $(detail.split(',')).each(function(i,v){

            if(v != '')
            {
                new_detail[new_detail.length] = v.split('-');
            }

        })

        $(new_detail[0]).each(function(i,v){
            $(new_detail[1]).each(function(i1,v1){
                $(new_detail[2]).each(function(i2,v2){
                $(new_detail[3]).each(function(i3,v3){
                    if(v == v1|| v == v2 || v == v3  || v1 == v2 || v1 == v3|| v2 == v3 )
                    {
                    } else {
                        num++;
                    }
                })
                })
            })
        })
        return num;
    },
    // FIXME: $ 依赖引入
    shiyi_mul_2:function(detail){
        //{1,2,3,4,5}
        var num = 0;
        var new_detail = [];
        detail = detail;
        $(detail.split(',')).each(function(i,v){
            if(v != '')
            {
                new_detail[new_detail.length] = v.split('-');
            }
        })

        $(new_detail[0]).each(function(i,v){
            $(new_detail[1]).each(function(i1,v1){
                if(v == v1)
                {
                } else {
                    num++;
                }
            })
        })

        return num;
    },
    mul_allow_2:function(detail){
        var data_sel = detail.split('-');
        var max_place = 0;
        var nums = 0;
        var s = data_sel.length;
        for(var i=0; i<=max_place; i++ ){
            if( s > 1 ){//二码不定位必须选两位或者以上
                nums += s*(s-1)/2;
            }
        }
        return this.change(nums);
    },
    mul_allow_3:function(detail){
        var data_sel = detail.split('-');
        var max_place = 0;
        var nums = 0;
        var s = data_sel.length;
        for(var i=0; i<=max_place; i++ ){
            if( s > 2 ){//必须选三位或者以上

                nums += s*(s-1)*(s-2)/6;
            }
        }
        return this.change(nums);
    },
    mul_allow_4:function(detail){
        var data_sel = detail.split('-');
        var max_place = 0;
        var nums = 0;
        var s = data_sel.length;
        for(var i=0; i<=max_place; i++ ){
            if( s > 3 ){//必须选四位或者以上
                nums += s*(s-1)*(s-2)*(s-3)/24;
            }
        }
        return this.change(nums);
    },
    mul_allow_5:function(detail){
        var data_sel = detail.split('-');
        var max_place = 0;
        var nums = 0;
        var s = data_sel.length;
        for(var i=0; i<=max_place; i++ ){
            if( s > 4 ){//必须选四位或者以上
                nums += s*(s-1)*(s-2)*(s-3)*(s-4)/120;
            }
        }
        return this.change(nums);
    },
    mul_allow_6:function(detail){
        var data_sel = detail.split('-');
        var max_place = 0;
        var nums = 0;
        var s = data_sel.length;
        for(var i=0; i<=max_place; i++ ){
            if( s > 5 ){//必须选四位或者以上
                nums += s*(s-1)*(s-2)*(s-3)*(s-4)*(s-5)/720;
            }
        }
        return this.change(nums);
    },
    mul_allow_7:function(detail){
        var data_sel = detail.split('-');
        var max_place = 0;
        var nums = 0;
        var s = data_sel.length;
        if( s > 6 ){//必须选四位或者以上
            nums += s*(s-1)*(s-2)*(s-3)*(s-4)*(s-5)*(s-6)/5040;
        }
        return this.change(nums);
    },
    mul_allow_8:function(detail){
        var data_sel = detail.split('-');
        var nums = 0;
        var s = data_sel.length;
        if( s > 7 ){//必须选四位或者以上
            nums += s*(s-1)*(s-2)*(s-3)*(s-4)*(s-5)*(s-6)*(s-7)/40320;
        }
        return this.change(nums);
    },
    front_2:function(detail){
        var data_sel = detail.split(',');
        data_sel[0] = data_sel[0].split('-');
        if(data_sel[1].length > 0)
        {
            data_sel[1] = data_sel[1].split('-');
        }
        var nums = 0;
        if( data_sel[0].length > 0 && data_sel[1].length > 0 ){
            for(var i=0; i<data_sel[0].length; i++ ){
                for(var j=0; j<data_sel[1].length; j++ ){
                    if( data_sel[0][i] != data_sel[1][j]){
                        nums++;
                    }
                }
            }
        }
        return this.change(nums);
    },
    front_zu_2:function(detail){
        var data_sel = detail.split('-');
        var max_place = 0;
        var nums = 0;
        var s = data_sel.length;
        if( s > 1 ){//组六必须选三位或者以上
            nums += s*(s-1)/2;
        }
        return this.change(nums);
    },
    front_3:function(detail){
        var data_sel = detail.split(',');
        data_sel[0] = data_sel[0].split('-');
        if(data_sel[1].length > 0)
        {
            data_sel[1] = data_sel[1].split('-');
        }
        if(data_sel[2].length > 0)
        {
            data_sel[2] = data_sel[2].split('-');
        }
        nums = 0;
        if( data_sel[0].length > 0 && data_sel[1].length > 0 && data_sel[2].length > 0 ){
            for(var i=0; i<data_sel[0].length; i++ ){
                for(var j=0; j<data_sel[1].length; j++ ){
                    for(var k=0; k<data_sel[2].length; k++ ){
                        if( data_sel[0][i] != data_sel[1][j] && data_sel[0][i] != data_sel[2][k] && data_sel[1][j] != data_sel[2][k] ){
                            nums++;
                        }
                    }
                }
            }
        }
        return this.change(nums);
    },
    front_zu_3:function(detail){
        var data_sel = detail.split('-');
        var nums = 0;
        var s = data_sel.length;
        if( s > 2 ){//组六必须选三位或者以上
            nums += s*(s-1)*(s-2)/6;
        }
        return this.change(nums);
    },
    org_3:function(detail){
        var arr = detail.match(/(\d)/g)
        if(arr == null)
        {
            return 0;
        }
        var len = arr.length
        num = 0
        for(var i = 0;i< len;i++)
        {
            for(var ii = 0;ii< len;ii++)
            {
                for(var iii = 0; iii<len;iii++)
                {
                    if(i == ii && ii == iii)
                        continue;
                    if(i != ii && ii != iii && iii != i)
                        continue;
                    num++;
                }
            }
        }
        /*//显示注数
         $('#lt_sel_nums').text(num)
         //价格
         $('#lt_sel_money').text(num*2)*/
        return num / 3;
    },
    org_6:function(detail){
        var arr = detail.match(/(\d+)/g)
        if(arr == null)
        {
            return 0;
        }
        var len = arr.length
        var count_arr = []
        num = 0
        for(var i = 0;i< len;i++)
        {
            for(var ii = 0;ii< len;ii++)
            {
                for(var iii = 0;iii< len;iii++)
                {
                    if(i == ii || i == iii || ii == iii)
                        continue;
                    num++
                }
            }
        }

        return num / 6;
    },
    org_2:function(detail){
        var arr = detail.match(/(\d+)/g)
        if(arr == null)
        {
            return 0;
        }
        var len = arr.length
        var count_arr = []
        num = 0
        for(var i = 0;i< len;i++)
        {
            for(var ii = 0;ii< len;ii++)
            {
                if(i == ii)
                    continue;
                num++
            }
        }


        return num;
    },
    position:function(detail){
        var arr = detail.match(/(\d+)/g)

        return arr.length;
    },
    //组选120.24算法
    /**
     *
     * @param num 二重号长度
     * @param baseLen 单号长度
     * @returns {number}
     */
    groupSelection:function(numLen,baseLen){
        var count = 1;
        for (var i = 0; i < baseLen; i++) {
            count *= (numLen--);
        }
        for (; baseLen > 1; baseLen--) {
            count /= baseLen;
        }
        return count;
    },
    /**
     * 递归循环计算注数
     * @param detail  要计算的内容
     * @param nums
     */
    groupSelectionDispose:function($arr,$n,$result){
        var $len = $arr.length;
        var $ret = [];
        if($result == undefined)
        {
            $result = [];
        }
        for(var $i = 0;$i<$len;$i++)
        {
            $result = $result.concat([$arr[$i]]);
            var $temp = [].concat($arr);
            for(var i=0;i<=$i;i++)
            {
                $temp.shift()
            }
            if($result.length == $n)
            {
                $ret[$ret.length] = [].concat($result);
            } else {
                $tmp = count_num.groupSelectionDispose($temp,$n,$result);
                for(var it=0;it<$tmp.length;it++)
                {
                    $ret[$ret.length] = [].concat($tmp[it]);
                }
            }
            $result.pop();
        }
        return $ret;
    },
    /**
     * 判断两个数组重复值
     * @param a
     * @param b
     */
    repeat:function(a,b){
        var temp = a.join();
        for(var kr=0;kr<b.length;kr++)
        {
            if(temp.search(b[kr]) >= 0)
            {
                return false;
            }
        }
        return true;
    },
    /**
     *
     * @param detail    投注的详细内容
     * @param nums  单号的长度
     * @param secNums 二重号长度
     * @returns {number}
     */
    groupSelectionMore:function(detail,oneNums,secNums){
        var t = detail.split(',');
        var secRow = t[0].split('-');
        var oneRow = t[1].split('-');
        var count = 0;

        var one_arr = count_num.groupSelectionDispose(oneRow,oneNums);
        var sec_arr = count_num.groupSelectionDispose(secRow,secNums);

        //去除重复的数组
        var new_arr = [];
        for(var k =0;k<one_arr.length;k++)
        {
            for(var k2 = 0;k2<sec_arr.length;k2++)
            {
                if(count_num.repeat(one_arr[k],sec_arr[k2]))
                {
                    count++;
                }

            }
        }
        return count;
    },
    /**
     * 去重复
     * @param detail
     * @returns {string}
     */
    unique:function(detail) {
        var arr = detail.split('#')
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result.join('#');
    },
    single:function(detail){
        var arr = detail.split('#')
        return arr.length;
    },
    /**
     * 直选跨度
     * @param detail 投注内容
     * @param len 长度
     */
    span:function(detail,len){
        var arr = detail.split('-')
        if(len == 3)
        {
            var l = [10,54,96,126,144,150,144,126,96,54];
        } else {
            var l = [10,18,16,14,12,10,8,6,4,2];
        }
        var count = 0;
        for(var i =0;i<arr.length;i++)
        {
            count += l[arr[i]];
        }
        return count;
    },
    /**
     * 组选和值
     * @param detail
     */
    groupSum:function(detail){
        var arr = detail.split('-')
        var newArr = {};
        for(var i = 0;i<1000;i++)
        {
            var temp = '';
            if(i.toString().length == 1)
            {
                temp = '00'+ i.toString()
            } else if(i.toString().length == 2) {
                temp = '0' + i.toString()
            } else {
                temp = i.toString();
            }

            if(temp[0] == temp[1] && temp[1] == temp[2])
            {
                continue;
            }
            var t = [parseInt(temp[0],10),parseInt(temp[1],10),parseInt(temp[2],10)];
            t.sort();
            newArr[t.join()] = t;
        }
        var count = 0;
        for(var i = 0;i<arr.length;i++)
        {
            for(var j in newArr)
            {
                var v = newArr[j];
                if(arr[i] == (v[0] + v[1] + v[2]))
                {
                    count++;
                }
            }
        }
        return count;
    },
    groupSum_2:function(detail){
        var arr = detail.split('-')
        var newArr = {};
        for(var i = 0;i<100;i++)
        {
            var temp = '';
            if(i.toString().length == 1)
            {
                temp = '0'+ i.toString()
            } else {
                temp = i.toString()
            }

            if(temp[0] == temp[1])
            {
                continue;
            }
            var t = [parseInt(temp[0],10),parseInt(temp[1],10)];
            t.sort();
            newArr[t.join()] = t;
        }
        var count = 0;
        for(var i = 0;i<arr.length;i++)
        {
            for(var j in newArr)
            {
                var v = newArr[j];
                if(arr[i] == (v[0] + v[1]))
                {
                    count++;
                }
            }
        }
        return count;
    }
}

export default count_num;
