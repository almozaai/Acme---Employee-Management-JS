const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];



const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
function findEmployeeByName(name1, employees){
  let objname = {}
  employees.forEach((obj, index, array) => {
                 if(obj.name == name1) {
                   objname = obj
                 }
})
    return objname
}
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager
function findManagerFor(obj, employees){
  let mangerObj = {}
  let managerId = obj.managerId
  employees.forEach((x, index, array) => {
    if(x.id === managerId){
      mangerObj = array[index]
    }
  })
  return mangerObj
}
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
function findCoworkersFor(obj, employees){
  let managerId = obj.managerId
  let coworkers = employees.filter((x, index, array) => {
    return x.managerId === managerId
  })
  coworkers.splice(coworkers.indexOf(obj),1)
  return  coworkers
}
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
function findManagementChainForEmployee(obj, employees){
  let array = []
  let idMan = obj.managerId
  for(let i = obj.managerId; i > 0 ; i--){
    for(let i =0; i < employees.length; i ++){
      if(idMan === employees[i].id){
        array.push(employees[i])
        idMan = employees[i].managerId
      }
    }
  }
  return array.reverse()
}
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
function generateManagementTree(employees){
  let arr = []
  let tree = {}
  let report = []
  employees.forEach(mangId => {
    arr.push(mangId.managerId)
  })
  arr.splice(arr.indexOf(undefined), 1)
  let maxMangerId = Math.max.apply(null,arr)
  let minMangerId = Math.min.apply(null,arr)

  for(let n = minMangerId; n <= maxMangerId; n++){
    for(let i = 0; i < employees.length; i++){
      if(employees[i].managerId === 1){

      tree.id = employees[i].id
      tree.name = employees[i].name
//    tree.managerId = employees[i].managerId
      tree.report = report.push(tree.id = employees[i].id, tree.name = employees[i].name, tree.managerId = employees[i].managerId)
    }
    }

  }
  return tree
}
console.log(generateManagementTree(employees))
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
