-- 1. Create certifications table (CMS)
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    icon_name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    color TEXT,
    bg_color TEXT,
    border_color TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create questions table (Exam Management)
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id TEXT NOT NULL, -- e.g. 'cissp-2024'
    text TEXT NOT NULL,
    choices JSONB NOT NULL, -- { "A": "...", "B": "...", ... }
    correct_answer TEXT NOT NULL, -- "A", "B", "C", "D"
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable RLS (Security)
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- 4. Create Security Policies

-- Certifications: Public can read active
CREATE POLICY "Public can view active certifications" 
ON certifications FOR SELECT 
TO public 
USING (is_active = true);

-- Certifications: Admins can full access
CREATE POLICY "Admins can manage certifications" 
ON certifications FOR ALL 
TO authenticated 
USING (
    auth.jwt() ->> 'email' IN ('ahkasakamika@gmail.com')
);

-- Questions: Public can read (for exams)
CREATE POLICY "Public can view questions" 
ON questions FOR SELECT 
TO public 
USING (true);

-- Questions: Admins can full access
CREATE POLICY "Admins can manage questions" 
ON questions FOR ALL 
TO authenticated 
USING (
    auth.jwt() ->> 'email' IN ('ahkasakamika@gmail.com')
);

-- 5. Insert Initial Data (Certifications)
INSERT INTO certifications (title, subtitle, description, slug, icon_name, color, bg_color, border_color) VALUES
('CISSP', '국제 공인 정보 시스템 보안 전문가', '정보 보안의 골드 스탠다드입니다. 보안 및 위험 관리, 자산 보안 등 8개 도메인을 다룹니다.', 'cissp', 'Shield', 'text-purple-400', 'bg-purple-400/10', 'border-purple-400/20'),
('CISM', '국제 공인 정보 보안 관리자', '엔터프라이즈 보안을 위한 관리, 리스크 관리 및 사고 대응에 초점을 맞춥니다.', 'cism', 'Lock', 'text-blue-400', 'bg-blue-400/10', 'border-blue-400/20'),
('CISA', '국제 공인 정보 시스템 감사사', '정보 시스템 감사, 통제 및 보안 전문가를 위한 세계적인 표준 자격증입니다.', 'cisa', 'FileCheck', 'text-emerald-400', 'bg-emerald-400/10', 'border-emerald-400/20'),
('CPPG', '개인정보 관리사', '개인정보 보호법 및 관련 컴플라이언스에 특화된 실무 중심의 자격증입니다.', 'cppg', 'Ribbon', 'text-orange-400', 'bg-orange-400/10', 'border-orange-400/20'),
('CIA', '국제 공인 내부 감사사', '전 세계적으로 유일하게 인정받는 내부 감사 전문 자격증입니다.', 'cia', 'Globe', 'text-pink-400', 'bg-pink-400/10', 'border-pink-400/20')
ON CONFLICT (slug) DO NOTHING;
