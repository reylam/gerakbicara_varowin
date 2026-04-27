import { Flame, Trophy, Play, CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { mockData } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const { user, lastLesson, dailyChallenges, badges, learningActivity } = mockData;
  const progressPercent = (user.currentXp / user.targetXp) * 100;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome Banner */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Halo kembali, {user.name}! 👋
            </h1>
            <p className="text-gray-500 mb-6">
              Konsistensi adalah kunci. Kamu sedang dalam jalur yang tepat untuk menguasai bahasa isyarat.
            </p>
            
            <div className="flex justify-between items-end mb-2">
              <span className="font-medium text-gray-700">
                Level {user.level}: {user.levelName}
              </span>
              <div className="text-right">
                <span className="font-bold text-primary-500">{user.currentXp.toLocaleString()}</span>
                <span className="text-gray-400 text-sm"> / {user.targetXp.toLocaleString()} XP</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
              <div 
                className="bg-accent-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 text-right">
              {(user.targetXp - user.currentXp).toLocaleString()} XP lagi untuk naik ke Level {user.level + 1}
            </p>
          </div>

          {/* Last Lesson Card */}
          <div className="bg-primary-500 rounded-2xl p-8 text-white relative overflow-hidden shadow-md">
            {/* Decorative background shape */}
            <div className="absolute right-0 top-0 w-64 h-full bg-primary-800/20 rounded-l-full transform translate-x-20"></div>
            
            <div className="relative z-10 flex justify-between items-center">
              <div className="max-w-md">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-4 backdrop-blur-sm">
                  Modul Terakhir
                </span>
                <h2 className="text-2xl font-bold mb-2">{lastLesson.moduleTitle}</h2>
                <p className="text-primary-100 mb-6">
                  {lastLesson.lessonTitle}
                </p>
                <button className="bg-white text-primary-800 px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-primary-50 transition-colors shadow-sm">
                  Lanjutkan Belajar <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Circular Progress */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    className="text-white/20 stroke-current" 
                    strokeWidth="8" 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                  />
                  <circle 
                    className="text-white stroke-current" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * lastLesson.progressPercentage) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{lastLesson.progressPercentage}%</span>
                  <span className="text-[10px] text-primary-100 uppercase tracking-wider">Selesai</span>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Activity Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Aktivitas Belajar</h3>
              <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-primary-500/20">
                <option>Minggu Ini</option>
              </select>
            </div>
            <div className="h-40 flex items-end justify-between gap-2 px-2">
              {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, i) => (
                <div key={day} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full max-w-[40px] bg-gray-100 rounded-t-lg relative group">
                    {learningActivity[i] > 0 && (
                      <div 
                        className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ${i === 3 ? 'bg-primary-500' : 'bg-primary-100'}`}
                        style={{ height: `${Math.max(10, (learningActivity[i] / 50) * 100)}%` }}
                      ></div>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${i === 3 ? 'text-primary-500 font-bold' : 'text-gray-400'}`}>{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Streak Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-50 text-accent-500 mb-4">
              <Flame className="w-8 h-8 fill-current" />
            </div>
            <div className="text-4xl font-black text-gray-800 mb-1">
              {user.streak} <span className="text-xl font-medium text-gray-500">Hari</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">Streak Berturut-turut!</p>
            
            <div className="flex justify-between px-2">
              {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-xs text-gray-400 font-medium">{day}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${user.streakDays[i] ? 'bg-accent-500 text-white shadow-sm shadow-accent-500/30' : 'bg-gray-100 text-gray-300'}`}>
                    {user.streakDays[i] ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Challenges */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Tantangan Harian</h3>
              <Trophy className="w-5 h-5 text-accent-500" />
            </div>
            <div className="space-y-3">
              {dailyChallenges.map((challenge) => (
                <div 
                  key={challenge.id} 
                  className={`p-3 border rounded-xl flex items-center gap-3 transition-colors ${ 
                    challenge.status === 'completed' ? 'border-success-500 bg-success-50/50' :
                    challenge.status === 'active' ? 'border-primary-200 bg-primary-50/30 shadow-sm shadow-primary-100/50' :
                    'border-gray-100 bg-gray-50 opacity-70'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {challenge.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-success-500" />
                    ) : challenge.status === 'active' ? (
                      <div className="w-6 h-6 rounded-full border-2 border-primary-500 flex items-center justify-center">
                        <Play className="w-3 h-3 text-primary-500 fill-current ml-0.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <Lock className="w-3 h-3 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${challenge.status === 'locked' ? 'text-gray-500' : 'text-gray-800'}`}>
                      {challenge.title}
                    </p>
                    <p className={`text-xs ${challenge.status === 'completed' ? 'text-success-600' : 'text-accent-500 font-medium'}`}>
                      +{challenge.xpReward} XP
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-primary-50 text-primary-700 text-sm font-semibold rounded-lg hover:bg-primary-100 transition-colors">
              Lihat Semua Tantangan
            </button>
          </div>

          {/* Badges Collection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Koleksi Lencana</h3>
              <a href="#" className="text-sm text-primary-500 font-medium hover:underline">
                Lihat Semua
              </a>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {badges.map((badge, i) => (
                <div key={badge.id} className="flex flex-col items-center text-center gap-2">
                  <div className={`w-14 h-14 rounded-full border-[3px] flex items-center justify-center relative overflow-hidden ${ 
                    badge.unlocked 
                      ? i === 0 ? 'border-accent-500 bg-accent-50 text-accent-500' : 'border-primary-500 bg-primary-50 text-primary-500'
                      : 'border-gray-200 bg-gray-50 text-gray-400'
                  }`}>
                    <Lock className={`w-6 h-6 ${badge.unlocked ? 'hidden' : 'block'}`} />
                    <Trophy className={`w-6 h-6 ${!badge.unlocked ? 'hidden' : 'block'}`} />
                  </div>
                  <span className="text-[10px] font-medium text-gray-600 leading-tight max-w-[56px] truncate">
                    {badge.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
