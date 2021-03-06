function printReceipt(barcodes) {
    console.log(dataIsValid(barcodes) ? getAllReceipt(barcodes) : null);
    /*console.log(`
***<store earning no money>Receipt ***
Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
----------------------
Total: 23 (yuan)
**********************`)*/
}

function dataIsValid(barcodes){//Valid the data.
    return barcodes != null && barcodes.length > 0;
}

function getAllReceipt(barcodes){//Combine the String result.
    let result = "\n***<store earning no money>Receipt ***\n";
    let objList = getValidObj(barcodes);
    let totalNum = 0;
    for(let i = 0; i < objList.length; i++){
        let eachTotalNum = objList[i].count * objList[i].price;
        result += "Name: " + objList[i].name +
                  ", Quantity: " + objList[i].count +
                  ", Unit price: " + objList[i].price +
                  " (yuan), Subtotal: " + eachTotalNum + " (yuan)\n";
        totalNum += eachTotalNum;
    }
    result += "----------------------\n" + 
              "Total: " + totalNum + " (yuan)\n" + 
              "**********************";
    return result;
}

function getValidObj(barcodes){//Get the every object count.
    let objList = new Array();
    for(let i = 0; i < barcodes.length; i++){
        let obj = getRelatedObj(barcodes[i]);
        if(obj != null){
            let j = 0;
            for(; j < objList.length; j++){
                if(obj.barcode == objList[j].barcode){
                    objList[j].count++;
                    break;
                }
            }
            if(j == objList.length){
                obj.count = 1;//Add a property named "Count" for the Barcode Object.
                objList.push(obj);
            }  
        }
    }
    return objList;
}

function getRelatedObj(barcode) {//Get the object by barcode.
    const allObj = loadDatabase();
    for (let i = 0; i < allObj.length; i++) {
        let obj = allObj[i];
        if (barcode == obj.barcode) {
            return obj;
        }
    }
    return null;
}

function loadDatabase(){//DB.
    return [
         {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
     ];
}

module.exports = {
    printReceipt
};