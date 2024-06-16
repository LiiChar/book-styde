import { NextRequest, NextResponse } from 'next/server';
import { UserType, db } from '../../../../drizzle/db';
import { getUser } from '../../../../lib/authGuardServer';
import { Teacher } from '../../../../drizzle/schema';
import { and, eq } from 'drizzle-orm';
import { authMiddlewareAdmin } from '@/lib/middleware';

export async function GET(req: NextRequest) {}

export type TeacherUserPostDTO = { student_id: number };
export async function POST(req: NextRequest) {
	const { student_id } = await req.json();
	const user = authMiddlewareAdmin() as UserType;

	try {
		await db.insert(Teacher).values({
			student_id,
			teacher_id: user.id,
		});
		return NextResponse.json({
			type: 'success',
			message: 'Студент зачислен к вам',
		});
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: error,
		});
	}
}
export async function PUT(req: NextRequest) {}
export async function DELETE(req: NextRequest) {
	const { student_id } = await req.json();
	const user = authMiddlewareAdmin() as UserType;

	try {
		await db
			.delete(Teacher)
			.where(
				and(eq(Teacher.student_id, student_id), eq(Teacher.teacher_id, user.id))
			);
		return NextResponse.json({
			type: 'success',
			message: 'Студент отчислен от вас',
		});
	} catch (error) {
		return NextResponse.json({
			type: 'error',
			message: error,
		});
	}
}
