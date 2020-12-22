import React from 'react'
import axios from './../../Utils/axios'
import echoerror from './../../Utils/echoerror'

import { Modal, Button, Spinner } from 'react-bootstrap'

class ReytingSetPlane extends React.Component {

    state = {

        show: false,
        loading: true,
        error: null,
        disabled: false,

        period: "",
        plan: 22,

    }

    /**
     * Открытие модального окна для заполнения данных
     * 
     * @param {object} el Элемент кнопки открытия
     */
    showModal = el => {

        this.setState({
            show: true,
            disabled: false,
            error: null
        });

        axios.post('reyting/showPlan').then(({ data }) => {

            this.setState({
                period: data.period,
                plan: data.plan,
            });

        }).catch(error => {
            this.setState({
                error: echoerror(error),
                disabled: true,
            });
        }).then(() => {
            this.setState({ loading: false });
        });

    }

    /**
     * Сохранение нового плана на период
     * 
     * @param {object} el Кнопка сохранения данных
     */
    setPlane = el => {

        this.setState({
            loading: true,
        });

        const formdata = {
            plan: this.state.plan,
            period: this.state.period
        }

        axios.post('reyting/setPlane', formdata).then(({ data }) => {
            this.setState({ show: false });
            this.props.donePlane(data.period);
        }).catch(error => {
            this.setState({ error: echoerror(error) });
        }).then(() => {
            this.setState({ loading: false });
        });

    }

    handleClose = el => this.setState({ show: false });

    render() {

        let button = <button type="button" className="btn btn-filter" onClick={this.showModal}>Определить план</button>

        const loading = this.state.loading
            ? <div className="d-flex justify-content-center align-items-center table-loading">
                <Spinner animation="grow" />
            </div>
            : null

        const error = this.state.error
            ? <div className="alert alert-danger mb-2 shadow-sm">{this.state.error}</div>
            : null

        return <>

            {button}

            <Modal show={this.state.show} onHide={this.handleClose} animation={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Определить план</Modal.Title>
                </Modal.Header>

                <Modal.Body className="position-relative">

                    {error}

                    <div className="text-left mb-2" id="descript">Выберите любую дату отчетной недели и количество необходимых приходов. Начало периода будет определено автоматически</div>

                    <input className="form-control" type="date" name="period" placeholder="Укажите дату начала отчетной недели" onChange={el => this.setState({ period: el.target.value })} value={this.state.period} disabled={this.state.disabled} />

                    <div className="input-group mt-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Количество приходов</span>
                        </div>
                        <input type="number" className="form-control" step="1" name="plan" onChange={el => this.setState({ plan: el.target.value })} value={this.state.plan} disabled={this.state.disabled} />
                    </div>

                    {loading}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.setPlane} disabled={this.state.loading || this.state.disabled}>Сохранить</Button>
                </Modal.Footer>
            </Modal>

        </>

    }

}

export default ReytingSetPlane