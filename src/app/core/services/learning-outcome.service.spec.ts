import {LearningOutcomeService} from './learning-outcome.service';

describe('LearningOutcomeService', () => {
  let service: LearningOutcomeService;
  beforeEach(() => {
    service = new LearningOutcomeService();
  });

  it('should get Learning Outcomes',
    (done: DoneFn) => {
      service.learningOutcomes.subscribe(learningOutcomes => {
        expect(learningOutcomes).toContain({
          id: '3b5957ea-3643-441d-bc96-a3d8f2b6e712',
          competence: {
            action: 'Die Studierenden können Marketingentscheidungen informationsgestützt treffen',
            taxonomyLevel: 'SYNTHESIS'
          },
          tools: [
            'das Makro- und Mikroumfeld des relevanten Marktes so wie das eigenen Unternehmen analysieren',
            'Konsequenzen für die verschiedenen Bereiche der Marketingpolitik entwerfen'
          ],
          purpose: 'Produkte, Preise, Kommunikation und den Vertrieb bewusst marktorientiert zu gestalten'
        });
        done();
      });
    });
});
