import React from 'react'
import axios from './../../Utils/axios'
import echoerror from './../../Utils/echoerror'

import './../../css/reytingCall.css'
import Icon from './../../Utils/FontAwesomeIcon'

import ReytingRow from './ReytingRow'
import ReytingRowTreners from './ReytingRowTreners'
import ReytingHeaderStat from './ReytingHeaderStat'
import ReytingSetPlane from './ReytingSetPlane'

class ReytingCall extends React.Component {

    state = {

        loading: true, // Идентификатор загрузки
        loadingDate: false, // Идентификатор загрузки измененного периода
        process: false, // Процесс загрузки данных
        pause: false, // Прерывать процесс отправки запроса

        rows: [], // Массив строк с операторами
        opened: [], // Массив идентификаторов раскрытых подробностей
        stat: {}, // Данные общей статистики

        treners: [], // Массив строк с данными тренера

        start: null, // Начало периода вывода статистики
        stop: null, // Окончание
        filter: null, // Фильтр списка строк
        setfilter: null, // Примененный фильтр после загрузки данных

        admin: false, // Идентификтаор администратора
        caller: false, // Идентификтаор прав кольщика
        nach: false, // Идентификтаор прав руководителя

        plan: null, // План работы на период
        planInDay: null, // Количество приходов в день

        access: true, // Доступ к рейтингу

        calltoken: null,

    }

    getReytingInterval = null;

    componentDidMount = async () => {

        let params = (new URL(document.location)).searchParams; 
        await this.setState({ calltoken: params.get("calltoken") || null });

        this.getReyting();

        const startInput = document.getElementById('date-period-start');
        startInput.onfocus = () => this.setState({ pause: true });
        startInput.onblur = () => this.setState({ pause: false });

        const stopInput = document.getElementById('date-period-stop');
        stopInput.onfocus = () => this.setState({ pause: true });
        stopInput.onblur = () => this.setState({ pause: false });

    }

    componentWillUnmount = () => {

        clearInterval(this.getReytingInterval);
        this.getReytingInterval = null;

    }

    getReyting = () => {

        if (this.state.process || this.state.pause)
            return false;

        this.setState({
            process: true,
            error: null
        });

        let formdata = {
            start: this.state.start,
            stop: this.state.stop,
            filter: this.state.filter,
            calltoken: this.state.calltoken,
        }

        axios.post('reyting/getCall', formdata).then(({ data }) => {

            // let filter = data.filter || null;

            // if (this.state.filter !== filter)
            //     this.setState({ filter: String(filter) })

            this.setState({
                admin: data.admin,
                caller: data.caller,
                nach: data.nach,
                plan: data.plan,
                rows: data.rows,
                treners: data.treners || [],
                start: data.start,
                stop: data.stop,
                stat: data.stat,
                setfilter: this.state.filter,
            });

            if (!this.getReytingInterval)
                this.getReytingInterval = setInterval(this.getReyting, 30000);

        }).catch(error => {

            let status = error?.response?.status || null; 

            this.setState({
                error: echoerror(error),
                access: status === 401 ? false : true,
            });

        }).then(() => {

            this.setState({
                loading: false,
                loadingDate: false,
                process: false,
            });

        });

    }

    /**
     * Метод раскрытия подробной информации статичтики одного кольщика
     * 
     * @param {object} el Кнопка раскрытия подробностей
     */
    showMore = el => {

        let opened = this.state.opened, // Массив идентификаторов раскрытых строк
            open = el.currentTarget.dataset.open, // Флаг открытия/закрытия подробностей
            id = el.currentTarget.dataset.id; // Идентификатор строки

        // Закрытие подробностей
        if (open === "1") {

            opened.forEach((row, idx) => {
                if (row === id)
                    opened.splice(idx, 1);
            });

        }
        // Открытие подробностей
        else {

            opened.push(id);

        }

        this.setState({ opened });

    }

    /**
     * Метод смены значения поля ввода даты
     * 
     * @param {element} el Поле ввода даты
     */
    changeDate = el => {

        let id = el.target.dataset.id;

        if (id === "start")
            this.setState({ start: el.target.value });
        else if (id === "stop")
            this.setState({ stop: el.target.value });

    }

    /**
     * Обработка нажатия кнопки "Показать"
     * 
     * @param {object} el Кнопка запуска
     */
    setPeriod = async el => {

        clearInterval(this.getReytingInterval);
        this.getReytingInterval = null;

        this.setState({ loadingDate: true });

        let start = document.getElementById('date-period-start').value || null;
        let stop = document.getElementById('date-period-stop').value || null;

        await this.setState({
            start,
            stop,
            opened: [],
        });

        setTimeout(() => el.target.blur(), 300);
        this.getReyting();

    }

    /**
     * Автоматическая смена дат
     * 
     * @param {object} el Кнопка смены дат 
     */
    setDate = async el => {

        clearInterval(this.getReytingInterval);
        this.getReytingInterval = null;

        this.setState({ loadingDate: true });

        let type = el.target.dataset.day, // Тип диапазона дат
            start = null, // Обнуление даты старта
            stop = null; // Обнуление даты остановки

        // Идентификатор необходимости создания даты из уже введенной в форму
        let fromdate = true;
        if (type === "today" || type === "toperiod")
            fromdate = false;

        // Введенные даты в поля ввода
        let inputStart = document.getElementById('date-period-start').value || null,
            inputStop = document.getElementById('date-period-stop').value || null;

        // Определение даты при равных датах для смены статистики одного дня
        let inputDate = inputStart === inputStop ? inputStart : null;

        // Дата для смены периода
        if (type === "backperiod" || type === "nextperiod")
            inputDate = inputStart;

        let date = fromdate && inputDate ? new Date(inputDate) : new Date(),
            time = date.getTime() / 1000,
            d = Number(date.getDate()),
            m = Number(date.getMonth()) + 1,
            yy = Number(date.getFullYear());

        let dd = d < 10 ? "0" + d : d;
        let mm = m < 10 ? "0" + m : m;

        // Вывод текущего дня
        if (type === "today") {
            start = stop = `${yy}-${mm}-${dd}`;
        }
        // Смещение на 1 день назад
        else if (type === "backDay") {
            start = stop = this.getDate((time - 86400) * 1000);
        }
        // Смещение на 1 день веперд
        else if (type === "nextDay") {
            start = stop = this.getDate((time + 86400) * 1000);
        }
        // Смена периода (1 неделя)
        else if (type === "toperiod" || type === "backperiod" || type === "nextperiod") {

            let daystart = null,
                daystop = null;

            if (d >= 24) {
                daystart = 24;
                daystop = 25;
            }
            else if (d >= 16) {
                daystart = 16;
                daystop = 17;
            }
            else if (d >= 9) {
                daystart = 9;
                daystop = 10;
            }
            else {
                daystart = 1;
                daystop = 2;
            }

            // На период назад
            if (type === "backperiod") {
                daystart = daystart - 3;
                daystop = daystop - 3;
            }
            // На период вперед
            else if (type === "nextperiod") {
                daystart = daystart + 10;
                daystop = daystop + 10;
            }

            start = this.getDate(yy, m - 1, daystart);
            stop = this.getDate(yy, m - 1, daystop);

        }

        await this.setState({
            start,
            stop,
            opened: [],
        });

        setTimeout(() => el.target.blur(), 300);
        this.getReyting();

    }

    /**
     * Метод вывода даты в формте ГГГГ-ММ-ДД
     * 
     * @param {number|null} year Год или отметка времени
     * @param {number|null} month Месяц
     * @param {number|null} day Число
     */
    getDate = (year = null, month = null, day = null) => {

        let date;

        if (year && month !== null && day)
            date = new Date(year, month, day);
        else if (year)
            date = new Date(year);
        else
            date = new Date();

        let dd = Number(date.getDate()),
            mm = Number(date.getMonth()) + 1,
            yy = Number(date.getFullYear());

        dd = dd < 10 ? "0" + dd : dd;
        mm = mm < 10 ? "0" + mm : mm;

        return `${yy}-${mm}-${dd}`;

    }

    /**
     * Применение фильтра вывода списка
     * 
     * @param {object} el Кнопка смены фильтра 
     */
    setFilter = async el => {

        clearInterval(this.getReytingInterval);
        this.getReytingInterval = null;

        await this.setState({
            loadingDate: true,
            filter: el.target.dataset.filter || null,
        });

        setTimeout(() => el.target.blur(), 300);
        this.getReyting();

    }

    /**
     * Обработка нажатия кнопок в поле ввода даты
     * 
     * @param {object} el Поля ввода даты 
     */
    keyUpInput = async el => {

        /** Отправка по нажатию кнопки Enter */
        if (el.keyCode === 13) {

            await this.setState({ loadingDate: true });

            clearInterval(this.getReytingInterval);
            this.getReytingInterval = null;

            el.target.blur();

            setTimeout(() => this.getReyting(), 300);

        }

    }

    /**
     * Завершение установки нового плана
     * 
     * @param {string} period Дата начала отчетной недели
     */
    donePlane = period => {

        if (period === this.state.start) {

            this.setState({ loadingDate: true });
            this.getReyting();

        }

    }

    render() {

        const rows = this.state.rows.map((row, key) => <ReytingRow key={key} row={row} opened={this.state.opened} showMore={this.showMore} plan={this.state.plan} filter={this.state.setfilter} />)

        const loading = this.state.loading || this.state.loadingDate
            ? <div className="header-loading">
                <Icon icon={['fas', 'spinner']} className="fa-spin" />
            </div>
            : null

        const globalLoading = this.state.loading
            ? <div className="global-loading">
                <Icon icon={['fas', 'spinner']} className="fa-spin" />
            </div>
            : null

        const loadingTable = this.state.loadingDate
            ? <div className="table-loading"></div>
            : null

        const stat = this.state.loading
            ? null
            : <ReytingHeaderStat stat={this.state.stat} plan={this.state.plan} filter={this.state.setfilter} caller={this.state.caller} />

        const treners = this.state.admin
            ? <ReytingRowTreners rows={this.state.treners} />
            : null

        const setPlane = this.state.admin
            ? <ReytingSetPlane donePlane={this.donePlane} />
            : null

        if (this.state.access === false) {
            return <div className="py-5 my-4 text-center">
                <div className="alert alert-danger mx-auto shadow access-false">Доступ к рейтингу ограничен или время сессии иcтекло</div>
            </div>
        }

        return (
            <div>

                <div className={`bg-info text-light py-3 text-center ${this.state.loading === true ? 'd-none' : ''}`}>

                    <div className="header-content mx-auto position-relative">

                        <strong className="main-title">Рейтинг</strong>

                        <div className="my-3 d-flex justify-content-center align-items-center">
                            <span>С</span>
                            <div className="input-group input-group-sm">
                                <input type="date" className="form-control mx-2" value={this.state.start || ""} id="date-period-start" onChange={this.changeDate} data-id="start" onKeyUp={this.keyUpInput} />
                            </div>
                            <span>по</span>
                            <div className="input-group input-group-sm">
                                <input type="date" className="form-control mx-2" value={this.state.stop || ""} id="date-period-stop" onChange={this.changeDate} data-id="stop" onKeyUp={this.keyUpInput} />
                            </div>
                            <button type="button" className="btn btn-dark btn-sm" onClick={this.setPeriod}>Показать</button>
                        </div>

                        <div className="btn-group btn-group-sm d-block mb-1" role="group">
                            <button type="button" className="btn btn-reyting" onClick={this.setDate} data-day="backDay">Предыдущий день</button>
                            <button type="button" className="btn btn-reyting" onClick={this.setDate} data-day="today">Сегодня</button>
                            <button type="button" className="btn btn-reyting" onClick={this.setDate} data-day="nextDay">Следующий день</button>
                        </div>

                        <div className="btn-group btn-group-sm d-block" role="group">
                            <button type="button" className="btn btn-reyting" onClick={this.setDate} data-day="backperiod">Предыдущий период</button>
                            <button type="button" className="btn btn-reyting" onClick={this.setDate} data-day="toperiod">Текущий период</button>
                            <button type="button" className="btn btn-reyting" onClick={this.setDate} data-day="nextperiod">Следующий период</button>
                        </div>

                        <div className="btn-group btn-group-sm d-block mt-2 mb-0" role="group">
                            {setPlane}
                            <a href="//saratov.4cpp.ru/modules/reyting/index.php?old=true" type="button" className="btn btn-secondary">Старая версия</a>
                        </div>

                        <div className="btn-group btn-group-sm d-block mt-2 mb-0" role="group">
                            <button type="button" className={`btn btn-filter ${this.state.filter === "all" || this.state.filter === null ? 'active' : ''}`} onClick={this.setFilter} data-filter="all">Колл-центр</button>
                            <button type="button" className={`btn btn-filter ${this.state.filter === "3" ? 'active' : ''}`} onClick={this.setFilter} data-filter="3">Сектор <b>A</b></button>
                            <button type="button" className={`btn btn-filter ${this.state.filter === "4" ? 'active' : ''}`} onClick={this.setFilter} data-filter="4">Сектор <b>B</b></button>
                            <button type="button" className={`btn btn-filter ${this.state.filter === "5" ? 'active' : ''}`} onClick={this.setFilter} data-filter="5">Сектор <b>C</b></button>
                            <button type="button" className={`btn btn-filter ${this.state.filter === "6" ? 'active' : ''}`} onClick={this.setFilter} data-filter="6">Сектор <b>D</b></button>
                        </div>

                        {loading}

                    </div>

                </div>

                {globalLoading}

                <div id="data-rows" className="rows-content position-relative">

                    {stat}

                    {treners}

                    {rows}

                    {loadingTable}

                </div>

            </div>
        )

    }

}

export default ReytingCall