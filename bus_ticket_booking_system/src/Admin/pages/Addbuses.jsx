function Addbuses() {
    return (
        <div>
            <h4>Add New Bus</h4>
            <form>
                <div class="form-group row">
                    <label for="busName" class="col-sm-2 col-form-label">Bus name: </label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="busName" placeholder="Enter Bus name"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="busModel" class="col-sm-2 col-form-label">Bus model: </label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="busModel" placeholder="Enter Bus model"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="travelDate" class="col-sm-2 col-form-label">Travel Date: </label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="travelDate" placeholder=""/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="deptTime" class="col-sm-2 col-form-label">Departure Time: </label>
                    <div class="col-sm-10">
                        <input type="time" class="form-control" id="deptTime" placeholder=""/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="arrivalTime" class="col-sm-2 col-form-label">Arrival Time: </label>
                    <div class="col-sm-10">
                        <input type="time" class="form-control" id="arrivalTime" placeholder="Password"/>
                    </div>
                </div>
                <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-sm-2 pt-0">Bus description</legend>
                        <div class="col-sm-10">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="SeaterBus" id="SeaterBus" value="SeaterBus" checked/>
                                    <label class="form-check-label" for="SeaterBus">
                                        Seater
                                    </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="SleeperBus" id="SleeperBus" value="SleeperBus"/>
                                    <label class="form-check-label" for="SleeperBus">
                                        Sleeper
                                    </label>
                            </div>
                        </div>
                        <div class="col-sm-10">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="SeaterBus" id="SeaterBus" value="SeaterBus" checked/>
                                    <label class="form-check-label" for="SeaterBus">
                                        AC
                                    </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="SleeperBus" id="SleeperBus" value="SleeperBus"/>
                                    <label class="form-check-label" for="SleeperBus">
                                        non-AC
                                    </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">Add Bus</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default Addbuses;