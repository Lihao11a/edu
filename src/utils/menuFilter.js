export function menuFilter (data,role){
    return data.filter(item=>{
        return item.meta.role.indexOf(role)!=-1
    }).map(item=>{
        if(item.children){
            item.children=menuFilter(item.children,role)
        }
        return item
    })
}