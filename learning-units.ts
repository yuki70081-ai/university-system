// learning-units.ts
import { Identifiable } from "./basic-contracts";
import { Student, Teacher } from "./person-hierarchy";


export class Course implements Identifiable {
  constructor(
    public readonly id: string,
    public title: string,
    public credits: number,
    // АГРЕГАЦІЯ: Курс знає про вчителя, але вчитель існує незалежно від курсу
    private _instructor: Teacher
  ) {}
  get instructor(): Teacher {
    return this._instructor;
  }

  public reassignInstructor(newInstructor: Teacher): void {
    console.log(`[Course Info] Зміна викладача курсу "${this.title}": ${newInstructor.fullName}`);
    this._instructor = newInstructor;
  }
}

export class AcademicGroup implements Identifiable {
  private _students: Map<string, Student> = new Map();

  constructor(
    public readonly id: string,
    public name: string,
    
    public curator?: Teacher
  ) {}
  public addStudent(student: Student): void {
    if (this._students.has(student.id)) {
      throw new Error(`Студент ${student.fullName} вже зарахований до групи ${this.name}`);
    }
    this._students.set(student.id, student);
  }

  public removeStudent(studentId: string): boolean {
    return this._students.delete(studentId);
  }

  public getStudents(): Student[] {
    return Array.from(this._students.values());
  }
  public getGroupAverageScore(): number {
    const list = this.getStudents();
    if (list.length === 0) return 0;
    const totalGpa = list.reduce((acc, s) => acc + s.calculateGPA(), 0);
    return Number((totalGpa / list.length).toFixed(2));
  }
}
