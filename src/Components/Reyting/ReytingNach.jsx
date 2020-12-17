function ReytingNach(props) {

    const stat = props.stat;

    const plan = props.plan
        ? <div className="text-center mx-3 my-2">
            <div>План</div>
            <div><strong>{props.plan}</strong></div>
        </div>
        : null

    return (

        <>

            <div className="reyting-row-content d-flex justify-content-center align-items-center">

                <div className="text-center mx-3 my-2">
                    <div>Все заявки</div>
                    <div><strong>{stat.sumZayavok || 0}</strong></div>
                </div>

                <div className="text-center mx-3 my-2">
                    <div>Заявки Москва</div>
                    <div><strong>{stat.mosReq || 0}</strong></div>
                </div>

                <div className="text-center mx-3 my-2">
                    <div>Приходы</div>
                    <div><strong>{stat.prihod || 0}</strong></div>
                </div>

                <div className="text-center mx-3 my-2">
                    <div>КПД</div>
                    <div><strong>{stat.kpd || 0}%</strong></div>
                </div>

                {plan}

                <div className="text-center mx-3 my-2" title="Ежемесячная премия от кассы">
                    <div>Премия</div>
                    <div><strong>{props.kassaMonth || 0}</strong></div>
                </div>

                <div className="text-center mx-3 my-2" title="Зарплата руководителя">
                    <div>Зарплата</div>
                    <div><strong>{props.zpNach || 0}</strong></div>
                </div>

            </div>

            <hr className="mt-2" />

        </>

    )

}

export default ReytingNach