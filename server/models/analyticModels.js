import db from "../config/db.js";

export const analyze = () => {
    return db("clients")
    .select("*")
};


export const timeBySubject = async (startMonth, endMonth) => {
    const rows = await db
        .select(
            db.raw("SUBSTRING(start_time::text, 12, 2) as hour"),
            db.raw('subject'),
            db.raw('COUNT(subject) as subject_count')
        )
        .where(function() {
            this.where(
                db.raw("EXTRACT(MONTH FROM start_time)"),
                ">=",
                startMonth
            ).andWhere(
                db.raw("EXTRACT(MONTH FROM start_time)"),
                "<=",
                endMonth
            );
        })
        .from('conversations')
        .groupBy('hour', 'subject');

    const result = rows.reduce((acc, row) => {
        const { hour, subject, subject_count } = row;
        if (!acc[hour]) {
            acc[hour] = {};
        }
        acc[hour][subject] = subject_count;
        return acc;
    }, {});

    return result;
};

export const filterData = async (startMonth, endMonth) => {
    return db("conversations")
        .select("*")
        .where(function() {
            this.where(
                db.raw("EXTRACT(MONTH FROM start_time)"),
                ">=",
                startMonth
            ).andWhere(
                db.raw("EXTRACT(MONTH FROM start_time)"),
                "<=",
                endMonth
            );
        });
};