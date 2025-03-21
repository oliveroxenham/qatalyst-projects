'use client';

import { Button } from '@/components/qbutton';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Content() {
  const { t } = useTranslation();
  
  return (
    <div className="w-full p-4 bg-background rounded-sm border mr-2 overflow-scroll">
      <div className="p-4">
        <span className="text-lg font-semibold">
          {t('qualityAssessment.criterias')}
        </span>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>{t('qualityAssessment.questions.stoveWork')}</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>{t('qualityAssessment.questions.manufacturer')}</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>{t('qualityAssessment.questions.stoveType')}</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>
            {t('qualityAssessment.questions.deliveryRisks')}
          </span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>{t('qualityAssessment.questions.lifeExpectancy')}</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>{t('qualityAssessment.questions.sourcedFrom')}</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>{t('qualityAssessment.questions.energySource')}</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>{t('qualityAssessment.questions.monitoringFrequency')}</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>{t('qualityAssessment.questions.monitoringMethod')}</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>
            {t('qualityAssessment.questions.rawMaterial')}
          </span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>{t('qualityAssessment.questions.feedstockAccess')}</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <div className="flex flex-col gap-8 p-4">
        <div className="flex flex-row justify-between">
          <span>{t('qualityAssessment.questions.sourceRisks')}</span>
          <Button variant="secondary" size="sm" disabled>
            <Plus /> {t('common.source')}
          </Button>
        </div>
        <textarea
          className="w-full h-32 border p-2 rounded text-sm"
          placeholder={t('common.keyinAnswer')}
        ></textarea>
      </div>

      <Separator className="my-4" />
      <span className="text-sm text-muted-foreground flex flex-row items-center gap-1">
        <Plus className="w-4 h-4" /> {t('common.addCriteria')}
      </span>
    </div>
  );
}
