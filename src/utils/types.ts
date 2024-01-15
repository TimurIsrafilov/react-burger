export type TypeIngredienInfo = {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    __v: number,
    _id: string,
}

export type TypeIngredienData = {
    success: boolean,
    data: TypeIngredienInfo
}

export type TypeUserInfo = {
    email: string,
    name: string,
    password?: string,
}

export type TypeUserData = {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: TypeUserInfo,
}

type TypeOrderInfo = {
    number: number,
}

export type TypeOrderData = {
    success: boolean,
    name: string,
    order: TypeOrderInfo,
}

export type TypeServerReply = {
    success: boolean,
    message: string,
    token: string,
    email: string,
    password: string,
}
