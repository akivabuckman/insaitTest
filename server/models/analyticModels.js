import db from "../config/db.js";



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
    console.log(result)
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

export const subjectByMonth = async (startMonth, endMonth) => {
    const rows = await db
        .select(
            db.raw("EXTRACT(MONTH FROM start_time) as month"),
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
        .groupBy('month', 'subject');

    const result = rows.reduce((acc, row) => {
        const { month, subject, subject_count } = row;
        if (!acc[subject]) {
            acc[subject] = {};
        }
        acc[subject][month] = subject_count;
        return acc;
    }, {});
    console.log(result);
    return result;
};

export const lengthBySubject = async (startMonth, endMonth) => {
    return db("conversations")
    .select("subject", "exchanges")
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
};

export const conversationsByGender = async (startMonth, endMonth) => {
    return db("conversations")
        .select("clients.gender")
        .count("conversations.id as conversation_count")
        .join("clients", "conversations.client_id", "clients.id")
        .where(function () {
            this.where(
                db.raw("EXTRACT(MONTH FROM conversations.start_time)"),
                ">=",
                startMonth
            ).andWhere(
                db.raw("EXTRACT(MONTH FROM conversations.start_time)"),
                "<=",
                endMonth
            );
        })
        .groupBy("clients.gender");
};

export const wordiness = async (startMonth, endMonth) => {
    return db("conversations")
        .select("conversations.subject", "conversations.exchanges", "clients.gender")
        .join("clients", "conversations.client_id", "clients.id")
        .where(function() {
            this.where(
                db.raw("EXTRACT(MONTH FROM conversations.start_time)"),
                ">=",
                startMonth
            ).andWhere(
                db.raw("EXTRACT(MONTH FROM conversations.start_time)"),
                "<=",
                endMonth
            );
        });
};
