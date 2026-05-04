import crypto from 'crypto';

const tasks = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, title: `AI Task #${i + 1}`, description: `Complete quality checks for dataset batch ${i + 1}`, reward: 20 + (i % 5) * 5 }));
const packages = { beginner: { cost: 110, earning: 800 }, skilled: { cost: 130, earning: 1500 }, expert: { cost: 150, earning: 2000 }, elite: { cost: 200, earning: 4000 } };
const db = { users: new Map(), tasks, packages };
const hash=(v)=>crypto.createHash('sha256').update(v).digest('hex');

export async function createUser({ username, phone, password }) { if (db.users.has(phone)) throw new Error('User exists'); const user = { username, phone, passwordHash: hash(password), balance: 0, completedTasks: [], assessmentPassed: false, freeTaskUsed: false, upgraded: false, paymentStatus: 'none' }; db.users.set(phone, user); return sanitizeUser(user); }
export async function loginUser({ phone, password }) { const user = db.users.get(phone); if (!user || user.passwordHash !== hash(password)) return null; return sanitizeUser(user); }
export function getUser(phone) { const user = db.users.get(phone); return user ? sanitizeUser(user) : null; }
function sanitizeUser(user) { const { passwordHash, ...rest } = user; return rest; }
export function setAssessment(phone, passed, score) { const user = db.users.get(phone); if (!user) return null; user.assessmentPassed = passed; user.assessmentScore = score; if (passed && user.balance === 0) user.balance += 100; return sanitizeUser(user); }
export function getTasksForUser(phone) { const user = db.users.get(phone); if (!user) return []; return db.tasks.map((task, index) => ({ ...task, locked: !user.upgraded && index > 0, completed: user.completedTasks.includes(task.id) })); }
export function submitTask(phone, taskId) { const user = db.users.get(phone); if (!user) throw new Error('No user'); const task = db.tasks.find((t) => t.id === taskId); if (!task) throw new Error('No task'); if (!user.upgraded && taskId > 1) throw new Error('Upgrade required'); if (user.completedTasks.includes(taskId)) throw new Error('Task already completed'); user.completedTasks.push(taskId); user.balance += task.reward; user.freeTaskUsed = user.freeTaskUsed || taskId === 1; return { balance: user.balance, reward: task.reward }; }
export function upgradeUser(phone, pkgKey) { const user = db.users.get(phone); if (!user) throw new Error('No user'); if (!db.packages[pkgKey]) throw new Error('No package'); user.upgraded = true; user.paymentStatus = 'success'; user.plan = pkgKey; return sanitizeUser(user); }
export function getPackage(key) { return db.packages[key]; }
