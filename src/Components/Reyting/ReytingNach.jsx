function ReytingNach(props) {

    const stat = props.stat;

    const plan = props.plan
        ? <div className="text-center mx-3 my-2">
            <div>План</div>
            <div><strong>{props.plan}</strong></div>
        </div>
        : null

    let sumZayavok = <div><strong>{stat.sumZayavok || 0}</strong></div>;
    let mosReq = <div><strong>{stat.mosReq || 0}</strong></div>;
    let prihod = <div><strong>{stat.prihod || 0}</strong></div>;
    let kpd = <div><strong>{stat.kpd || 0}</strong></div>;
    let kassaMonth = <div><strong>{props.kassaMonth || 0}</strong></div>;
    let zpNach = <div><strong>{props.zpNach || 0}</strong></div>;

    if (props.row.sectors) {

        const sectors = {
            sumZayavok: [],
            mosReq: [],
            prihod: [],
            kpd: [],
            kassaMonth: [],
            zpNach: [],
        };

        props.row.sectors.forEach(row => {

            sectors.sumZayavok.push(row.nachStat.sumZayavok || 0);
            sectors.mosReq.push(row.nachStat.mosReq || 0);
            sectors.prihod.push(row.nachStat.prihod || 0);
            sectors.kpd.push(row.nachStat.kpd || 0);
            sectors.kassaMonth.push(row.sector === props.row.sector ? props.kassaMonth : 0);
            sectors.zpNach.push(`${row.zpNach || 0} ${row.sector}`);

        });

        sumZayavok = sectors.sumZayavok.length ? sectors.sumZayavok.map((row, i) => <div key={`1_${i}`}><strong>{row}</strong></div>) : sumZayavok;
        mosReq = sectors.mosReq.length ? sectors.mosReq.map((row, i) => <div key={`2_${i}`}><strong>{row}</strong></div>) : mosReq;
        prihod = sectors.prihod.length ? sectors.prihod.map((row, i) => <div key={`3_${i}`}><strong>{row}</strong></div>) : prihod;
        kpd = sectors.kpd.length ? sectors.kpd.map((row, i) => <div key={`4_${i}`}><strong>{row}</strong></div>) : kpd;
        kassaMonth = sectors.kassaMonth.length ? sectors.kassaMonth.map((row, i) => <div key={`5_${i}`}><strong>{row}</strong></div>) : kassaMonth;
        zpNach = sectors.zpNach.length ? sectors.zpNach.map((row, i) => <div key={`6_${i}`}><strong>{row}</strong></div>) : zpNach;

    }

    return (

        <>

            <div className="reyting-row-content d-flex justify-content-center align-items-center">

                <div className="text-center mx-3 my-2">
                    <div>Все заявки</div>
                    {sumZayavok}
                </div>

                <div className="text-center mx-3 my-2">
                    <div>Заявки Москва</div>
                    {mosReq}
                </div>

                <div className="text-center mx-3 my-2">
                    <div>Приходы</div>
                    {prihod}
                </div>

                <div className="text-center mx-3 my-2">
                    <div>КПД</div>
                    {kpd}
                </div>

                {plan}

                <div className="text-center mx-3 my-2" title="Ежемесячная премия от кассы">
                    <div>Премия</div>
                    {kassaMonth}
                </div>

                <div className="text-center mx-3 my-2" title="Зарплата руководителя">
                    <div>Зарплата</div>
                    {zpNach}
                </div>

            </div>

            <hr className="mt-2" />

        </>

    )

}

export default ReytingNach