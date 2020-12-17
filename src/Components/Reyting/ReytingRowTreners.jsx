function ReytingRowTreners(props) {

    const rows = props.rows.map((row, key) => {
        return <div key={key} className="reyting-row color-trener shadow-sm">

            <div className="reyting-row-content d-flex justify-content-center align-items-center">

                <div className="text-center mx-3 my-2">
                    <div><strong>{row.pin}</strong></div>
                    <div>{row.doljnost || 'Тренер'}</div>
                </div>

                <div className="text-center mx-3 my-2">
                    <div><strong>{row.fio}</strong></div>
                </div>

                <div className="text-center mx-3 my-2">
                    <div>Зарплата</div>
                    <div><strong>{row.zp}</strong> руб</div>
                </div>

                <div className="text-left mx-3 my-2">
                    <div>Начислено</div>
                    {row.okladWeeck > 0 ? <div className="row-more-info">Оклад: {row.okladWeeck} руб</div> : null}
                    {row.zpColl > 0 ? <div className="row-more-info">Колл-центр: {row.zpColl} руб</div> : null}
                    {row.prihodsPart > 0 ? <div className="row-more-info">Приходы: {row.prihods} * {row.prihodsPart} = {row.zpPrihod} руб</div> : null}
                    <div className="row-more-info">Премия кассы: {row.kassa} руб</div>
                </div>

            </div>

        </div>
    });

    return rows

}

export default ReytingRowTreners