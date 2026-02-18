export interface Question {
  id: number;
  domain: string;
  question: string;
  options: string[];
  answer: number; // 0-indexed index of the correct option
  explanation: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: Question[];
}

// Helper to generate placeholder questions
const generatePlaceholders = (startId: number, count: number): Question[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: startId + i,
    domain: ['정보시스템 감사 프로세스', 'IT 거버넌스 및 관리', '정보시스템 습득, 개발 및 구현', '정보시스템 운영, 유지보수 및 서비스 관리', '정보자산의 보호'][i % 5],
    question: `[모의문제 ${startId + i}] 정보시스템 감사인이 수행해야 할 절차로 가장 적절한 것은 무엇인가? (이 문제는 50문항 구성을 위한 예시입니다)`,
    options: [
      '감사 계획 수립 및 위험 평가',
      '경영진에게 즉시 보고',
      '보안 솔루션 직접 설치',
      '직원 교육 프로그램 개발'
    ],
    answer: 0,
    explanation: '감사인은 감사 업무를 시작하기 전에 반드시 위험 기반의 감사 계획을 수립해야 합니다.'
  }));
};

export const CISA_EXAM: Exam = {
  id: 'cisa-mock-1',
  title: 'CISA 실전 모의고사 (50문항)',
  description: '실제 시험과 동일한 환경에서 50문제를 풀어보고 실력을 점검하세요.',
  timeLimit: 120, // 2 hours
  questions: [
    {
      id: 1,
      domain: '정보시스템 감사 프로세스',
      question: '감사 헌장(Audit Charter)에 포함되어야 할 가장 중요한 요소는 무엇인가?',
      options: [
        '감사 부서의 예산 및 인력 계획',
        '감사인의 휴가 일정',
        '감사 부서의 권한, 책임 및 목적',
        '구체적인 연간 감사 일정'
      ],
      answer: 2,
      explanation: '감사 헌장은 내부 감사 활동의 목적, 권한, 책임을 공식적으로 정의하는 문서입니다.'
    },
    {
      id: 2,
      domain: 'IT 거버넌스 및 관리',
      question: '비즈니스 연속성 계획(BCP) 테스트의 주요 목적은 무엇인가?',
      options: [
        '백업 시스템의 성능 측정',
        '계획의 유효성 검증 및 개선점 식별',
        '직원들의 휴식 시간 제공',
        'IT 예산 절감'
      ],
      answer: 1,
      explanation: 'BCP 테스트의 주 목적은 계획이 실제 재해 상황에서 효과적으로 작동하는지 검증하고 부족한 부분을 찾아 개선하는 것입니다.'
    },
    {
      id: 3,
      domain: '정보자산의 보호',
      question: '다음 중 대칭키 암호화 방식의 단점은 무엇인가?',
      options: [
        '암호화 및 복호화 속도가 느리다.',
        '키 분배 및 관리의 어려움',
        '알고리즘이 복잡하다.',
        '전자 서명에 사용할 수 있다.'
      ],
      answer: 1,
      explanation: '대칭키 암호화는 송수신자가 동일한 키를 공유해야 하므로, 안전한 키 분배와 관리가 어렵다는 단점이 있습니다.'
    },
    {
      id: 4,
      domain: '정보시스템 습득, 개발 및 구현',
      question: 'SDLC 단계 중 보안 요구사항이 정의되어야 하는 가장 적절한 시점은?',
      options: [
        '시스템 테스트 단계',
        '시스템 구현 단계',
        '요구사항 정의 단계',
        '유지보수 단계'
      ],
      answer: 2,
      explanation: '보안은 "Security by Design" 원칙에 따라 프로젝트 초기인 요구사항 정의 단계부터 고려되어야 가장 효과적이고 비용 효율적입니다.'
    },
    {
      id: 5,
      domain: '정보시스템 운영, 유지보수 및 서비스 관리',
      question: '서비스 수준 계약(SLA)에서 가장 중요한 요소는 무엇인가?',
      options: [
        '서비스 제공자의 이익',
        '측정 가능한 성과 지표(KPI)',
        '계약서의 페이지 수',
        '서비스 제공자의 기술 스택'
      ],
      answer: 1,
      explanation: 'SLA는 서비스 수준을 정량적으로 측정하고 평가할 수 있는 명확한 지표(KPI)를 포함해야 합니다.'
    },
    ...generatePlaceholders(6, 45) // Generate remaining 45 questions to reach 50
  ]
};

// Dashboard Mock Data
export interface DashboardStats {
  totalCertificates: number;
  issuedThisMonth: number;
  activeTemplates: number;
}

export interface Certificate {
  id: string;
  courseTitle: string;
  recipientName: string;
  status: 'draft' | 'issued' | 'revoked';
  completionDate: string;
  certificateId: string;
}

export const mockStats: DashboardStats = {
  totalCertificates: 24,
  issuedThisMonth: 8,
  activeTemplates: 3
};

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    courseTitle: 'CISA (Certified Information Systems Auditor)',
    recipientName: '홍길동',
    status: 'issued',
    completionDate: '2025-02-15T09:00:00Z',
    certificateId: 'CISA-2025-001'
  },
  {
    id: '2',
    courseTitle: 'CISSP (Certified Information Systems Security Professional)',
    recipientName: '김철수',
    status: 'draft',
    completionDate: '2025-03-01T00:00:00Z',
    certificateId: 'PENDING'
  },
  {
    id: '3',
    courseTitle: 'CPPG (Certified Privacy Protection General)',
    recipientName: '이영희',
    status: 'revoked',
    completionDate: '2024-12-20T14:30:00Z',
    certificateId: 'CPPG-2024-999'
  }
];
