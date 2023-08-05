export const paginate = (items: any, pageNumber: number, pageSize: number) => {
    console.log(items, pageNumber, pageSize);
    
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize); // 0, 9
};