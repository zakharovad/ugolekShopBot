import 'automapper-ts'
import IMemberConfigurationOptions = AutoMapperJs.IMemberConfigurationOptions;

automapper.createMap('IMongoProduct', 'IProduct').forAllMembers((destinationObject: any, destinationPropertyName: string, value: any) => {
    destinationObject[destinationPropertyName] = value;

})
automapper.createMap('IMongoProduct', 'ICartProduct')
    .forMember('title', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('title')
    })
    .forMember('description', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('description')
    })
    .forMember('start_parameter', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('_id')
    })
    .forMember('count', (opts: IMemberConfigurationOptions) => {
        return 1
    })
    .forMember('total_amount', (opts: IMemberConfigurationOptions) => {
        opts.mapFrom('price')
    })


