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
        // returns:
        //  {
        //   '10': {
        //     accounts: '4',
        //     'credit cards': '1',
        //     mortgages: '2',
        //     transfers: '1',
        //     'wire transfers': '1'
        //   },
        //   '11': {
 
        const { hour, subject, subject_count } = row;
        if (!acc[hour]) {
            acc[hour] = {};
        }
        acc[hour][subject] = subject_count;
        return acc;
    }, {});
    return result;
};

export const subjectByMonth = async (startMonth, endMonth) => {
    // returns this format:
    //   {
    //     accounts: {
    //       '1': '5',
    //       '2': '3',
    //       '3': '2',
    //       '4': '4',
    //       '5': '2',
    //       '6': '1',
    //       '7': '1',
    //       '8': '5',
    //       '9': '3',
    //       '10': '5'
    //     },
    //     'credit cards': {
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
    return result;
};

export const lengthBySubject = async (startMonth, endMonth) => {
    // returns subject and exchanges columns of the relevant months
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
    });
};

export const conversationsByGender = async (startMonth, endMonth) => {
    // returns this format
    // [
    //     {
    //         "gender": "female",
    //         "conversation_count": "59"
    //     },
    //     {
    //         "gender": "male",
    //         "conversation_count": "41"
    //     }
    // ] 
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
    // returns this format
    // [
    //     {
    //         "subject": "transfers",
    //         "exchanges": [
    //             "customer: Hello! I need some help with my account balance. Can you assist me with that?",
    //             "chatbot: Of course! I'd be happy to help you with your account balance. To get started, please provide your account number or the last four digits of your social security number for verification.",
    //             ...
    //         ],
    //         "gender": "female"
    //     },
    //     {
    //         "subject": "accounts",
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
