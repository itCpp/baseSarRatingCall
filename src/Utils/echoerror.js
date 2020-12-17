const echoerror = error => {

    if (error.response) {

        if (error.response.data) {

            if (error.response.data.message)
                return error.response.data.message;

            return error.response.statusText;

        }

    }

    console.error(error || "Неизвестная ошибка");
    return "Неизвестная ошибка";

}

export default echoerror;