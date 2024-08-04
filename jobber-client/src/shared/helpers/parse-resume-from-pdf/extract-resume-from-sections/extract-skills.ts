import { deepClone } from '../lib/deep-clone';
import type { ResumeSectionToLines } from '../types';
import { initialFeaturedSkills } from '../types/static-data';
import type { ResumeSkills } from '../types/types';
import { getBulletPointsFromLines, getDescriptionsLineIdx } from './lib/bullet-points';
import { getSectionLinesByKeywords } from './lib/get-section-lines';

export const extractSkills = (sections: ResumeSectionToLines) => {
  const lines = getSectionLinesByKeywords(sections, ['skill']);
  const descriptionsLineIdx = getDescriptionsLineIdx(lines) ?? 0;
  const descriptionsLines = lines.slice(descriptionsLineIdx);
  const descriptions = getBulletPointsFromLines(descriptionsLines);

  const featuredSkills = deepClone(initialFeaturedSkills);
  if (descriptionsLineIdx !== 0) {
    const featuredSkillsLines = lines.slice(0, descriptionsLineIdx);
    const featuredSkillsTextItems = featuredSkillsLines
      .flat()
      .filter((item) => item.text.trim())
      .slice(0, 6);
    for (let i = 0; i < featuredSkillsTextItems.length; i++) {
      featuredSkills[i].skill = featuredSkillsTextItems[i].text;
    }
  }

  const skills: ResumeSkills = {
    featuredSkills,
    descriptions
  };

  return { skills };
};
