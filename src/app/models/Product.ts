export class Product {
    public id: number;
    public handle: string;
    public title: string;
    public description: string;
    public sku: string;
    public grams: number;
    public stock: number;
    public price: number;
    public comparePrice: number;
    public barcode: string;

    constructor(data: any){
        this.id = data.id || '';
        this.handle = data.handle || '';
        this.title = data.title || '';
        this.description = data.description || '';
        this.sku = data.sku || 0;
        this.grams = data.grams || 0;
        this.stock = data.stock || 0;
        this.price = data.price || 0;
        this.comparePrice = data.comparePrice || 0;
        this.barcode = data.barcode || '';
        
    }

}