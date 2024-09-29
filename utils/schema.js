import { PgTable, pgTable, serial ,text, varchar } from "drizzle-orm/pg-core";

export const MockInterview=pgTable('mockInterview',{
    id:serial('id').primaryKey(),   //primary key concept
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobposition').notNull(),
    jobDesc:varchar('jobdesc').notNull(),
    jobExpe:varchar('jobexpe').notNull(),
    createdAt:varchar('createdAt').notNull(),
    createdBy:varchar('createdBy').notNull(),
    mockId :varchar('mockId').notNull()
})

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),    // foreign key concept
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),

})