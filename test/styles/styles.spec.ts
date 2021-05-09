import { Style } from "../../lib/components/styles/style";

describe('Style', () => {

    const style = new Style();

    it('Create Style', (done)=> {

        style.loadCdn([
          { 
           name: 'bootstrap',
           src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css' 
          }
        ]);

        setTimeout(()=> {
            const styles = style.allStyles.map(({ name }) => name);
            expect(styles.includes('bootstrap')).toBeTruthy();
            done();
        }, 500)
    });
});
