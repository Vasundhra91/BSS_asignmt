export function generateRows({
  length,
  test
}) {
    
  const data = [];
  for (let i = 0; i < length; i += 1) {
    data.push(test[i]);
  }
  let map = data.map((item=>{
        return {"id":item.id,"Location": item.Location,"Address1":item.Address1,"PhoneNo":formatPhoneNumber(item.PhoneNo)}
    }));
  return map;
}
  let formatPhoneNumber = (str) => {
  let cleaned = ('' + str).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  };
  return null
};