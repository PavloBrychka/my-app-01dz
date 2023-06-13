export interface ICategoryItem {
    id: number, // id товару
    name: string, // назва елементу
    image: string,// фото елементу
    description: string // опис елементу
}

export interface ICategoryResponse {
    data: Array<ICategoryItem>, //Записи, які ми отримали по даній сторінці
    current_page: number, //поточна сторінка зараз
    total: number,        //Кількість усіх записів
    last_page: number     //кількість усіх сторінок 2
}


export interface ICategorySearch {
    page?: number|string|null  // пошук
}